import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;
let initPromise: Promise<SQLite.SQLiteDatabase> | null = null; // ← lock

export async function initDB(): Promise<SQLite.SQLiteDatabase> {
  // Already initialized — return immediately
  if (db) return db;

  // Initialization in progress — wait for it instead of starting a new one
  if (initPromise) return initPromise;

  // First call — start initialization and store the promise
  initPromise = (async () => {
    try {
      const instance = await SQLite.openDatabaseAsync("app6.db");

      await instance.execAsync(`PRAGMA foreign_keys = ON;`);

      await instance.execAsync(`
        CREATE TABLE IF NOT EXISTS categories (
          id    INTEGER PRIMARY KEY AUTOINCREMENT,
          name  TEXT    NOT NULL UNIQUE,
          icon  TEXT    NOT NULL,
          color TEXT    NOT NULL
        );
      `);

      await instance.execAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
          id             INTEGER PRIMARY KEY AUTOINCREMENT,
          title          TEXT    NOT NULL,
          note           TEXT,
          scheduled_date TEXT    NOT NULL,
          time           TEXT,
          priority       INTEGER DEFAULT 1,
          status         TEXT    DEFAULT 'pending',
          category_id    INTEGER NULL,
          created_at     TEXT    DEFAULT CURRENT_TIMESTAMP,
          updated_at     TEXT    DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
        );
      `);

      db = instance; // ← only set after full setup succeeds
      return db;
    } catch (error) {
      initPromise = null; // ← reset so it can be retried on failure
      console.error("DB Init Error:", error);
      throw error;
    }
  })();

  return initPromise;
}
