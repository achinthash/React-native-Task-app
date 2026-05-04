import { initDB } from "./db";
type tasksStatus = "pending" | "completed";

interface CreateTaskResponse {
  success: boolean;
  message: string;
  error?: unknown;
}

export const createTask = async (
  title: string,
  note: string,
  scheduled_date: string,
  time: string,
  priority: number,
  status: tasksStatus,
  category_id: number | null,
): Promise<CreateTaskResponse> => {
  try {
    const db = await initDB();

    // await db.runAsync('alter table tasks')

    await db.runAsync(
      `INSERT INTO tasks 
      (title, note, scheduled_date, time, priority, status, category_id) 
      VALUES (?, ?, ?, ?, ?, ?,?)`,
      [title, note, scheduled_date, time, priority, status, category_id],
    );

    return {
      success: true,
      message: "Task created successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: "Failed to create task",
      error,
    };
  }
};

interface CreateCategoryResponse {
  success: boolean;
  message: string;
  error?: unknown;
}

export const createCategory = async (
  name: string,
  icon: string,
  color: string,
): Promise<CreateCategoryResponse> => {
  try {
    const db = await initDB();

    const existing = await db.getFirstAsync(
      `SELECT * FROM categories WHERE name = ? `,
      [name],
    );

    if (existing) {
      return {
        success: false,
        message: "Category already exists",
      };
    }

    await db.runAsync(
      `INSERT INTO categories 
      (name, icon, color) 
      VALUES (?, ?,?)`,
      [name, icon, color],
    );

    return {
      success: true,
      message: "Category created successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: "Failed to create Category",
      error,
    };
  }
};

export const getAllCategories = async (): Promise<any> => {
  try {
    const db = await initDB();

    const response = await db.getAllAsync("SELECT * FROM categories");
    return response;
  } catch (error) {}
};

interface deleteCategoryResponse {
  success: boolean;
  message: string;
  error?: unknown;
}

export const deleteCategory = async (
  id: number,
): Promise<deleteCategoryResponse> => {
  try {
    const db = await initDB();

    await db.runAsync(
      `UPDATE tasks SET category_id = NULL WHERE category_id = ?`,
      [id],
    );

    const response = await db.runAsync(`DELETE FROM categories WHERE id = ?`, [
      id,
    ]);

    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: "Failed to deleted Category",
      error,
    };
  }
};

export const updateCategory = async (
  id: number,
  name: string,
  icon: string,
  color: string,
): Promise<CreateCategoryResponse> => {
  try {
    const db = await initDB();

    const existing = await db.getFirstAsync(
      `SELECT id FROM categories WHERE name = ? AND id != ?`,
      [name, id],
    );

    if (existing) {
      return {
        success: false,
        message: "Category name already exists",
      };
    }

    await db.runAsync(
      `UPDATE categories SET name = ?, icon = ?, color = ? WHERE id = ?`,
      [name, icon, color, id],
    );

    return {
      success: true,
      message: "Category updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to update category",
      error,
    };
  }
};

export type Task = {
  id: number;
  title: string;
  note: string | null;
  scheduled_date: string;
  time: string | null;
  priority: number;
  status: string;
  category_id: number | null;
  created_at: string;
  updated_at: string;
  category_name: string | null;
  category_icon: string | null;
  category_color: string | null;
};

export async function getTasksCalendar(startDate: string, endDate: string) {
  try {
    const db = await initDB();

    // Cleaned up the query syntax
    const query = ` 
      SELECT 
        tasks.id,
        tasks.title,
        tasks.note,
        tasks.scheduled_date,
        tasks.time,
        tasks.priority,
        tasks.status,
        tasks.category_id,
        tasks.created_at,
        tasks.updated_at,
        categories.name  AS category_name,
        categories.icon  AS category_icon,
        categories.color AS category_color
      FROM tasks
      LEFT JOIN categories ON tasks.category_id = categories.id
      WHERE scheduled_date BETWEEN ? AND ?
    `;

    // Execute with parameters
    const tasks = await db.getAllAsync<Task>(query, [startDate, endDate]);

    return tasks;
  } catch (error) {
    console.error("Database Fetch Error:", error);
    return [];
  }
}

export async function getTasks(limit = 1000): Promise<{ tasks: Task[] }> {
  const db = await initDB();

  const tasks = (await db.getAllAsync(
    `
    SELECT 
      t.id,
      t.title,
      t.note,
      t.scheduled_date,
      t.time,
      t.priority,
      t.status,
      t.category_id,
      t.created_at,
      t.updated_at,

      c.name AS category_name,
      c.icon AS category_icon,
      c.color AS category_color

    FROM tasks t
    LEFT JOIN categories c ON t.category_id = c.id

    ORDER BY date(t.scheduled_date) DESC, t.time DESC
    LIMIT ?
    `,
    [limit],
  )) as Task[];

  return { tasks };
}

export async function updateTaskStatus(
  id: number,
  status: "pending" | "completed",
) {
  const db = await initDB();

  await db.runAsync(
    `
    UPDATE tasks
    SET status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
    `,
    [status, id],
  );
}

export async function getTaskById(id: number): Promise<Task | null> {
  const db = await initDB();

  const response = await db.getFirstAsync<Task>(
    `SELECT 
      t.*, 
      c.name AS category_name,
      c.color AS category_color,
      c.icon AS category_icon
    FROM tasks t
    LEFT JOIN categories c 
      ON t.category_id = c.id
    WHERE t.id = ?
    `,
    [id],
  );

  return response;
}

export async function updateTask(
  title: string,
  note: string,
  scheduled_date: string,
  time: string,
  priority: number,
  status: string,
  category_id: number | null,
  id: number,
): Promise<CreateTaskResponse> {
  const db = await initDB();

  try {
    await db.runAsync(
      `UPDATE tasks SET title = ?, note = ?, scheduled_date = ?, time = ?, priority = ?, status = ?, category_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [title, note, scheduled_date, time, priority, status, category_id, id],
    );

    return {
      success: true,
      message: "Category updated successfully",
    };
  } catch (error) {
    console.error("Update Task Error:", error);
    throw error;
  }
}

interface deleteTaskResponse {
  success: boolean;
  message: string;
  error?: unknown;
}

export const deleteTask = async (id: number): Promise<deleteTaskResponse> => {
  try {
    const db = await initDB();

    await db.runAsync(`DELETE FROM tasks WHERE id = ?`, [id]);

    return {
      success: true,
      message: "Task deleted successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: "Failed to deleted task",
      error,
    };
  }
};
