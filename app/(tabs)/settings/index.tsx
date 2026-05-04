// import { Alert, Pressable, ScrollView, Text, View } from "react-native";

// import { useSafeAreaInsets } from "react-native-safe-area-context";

// export default function settings() {
//   const insets = useSafeAreaInsets();

//   const openNewTask = () => {
//     console.log("f");

//     Alert.alert("rr");
//   };

//   return (
//     <View className="flex-1">
//       <View
//         style={{
//           position: "absolute",
//           right: 20,
//           bottom: insets.bottom + 60, // 👈 dynamic spacing above tab bar
//           zIndex: 100,
//         }}
//       >
//         <Pressable
//           onPress={openNewTask}
//           style={{
//             backgroundColor: "blue",
//             paddingVertical: 12,
//             paddingHorizontal: 16,
//             borderRadius: 30,
//             elevation: 5,
//           }}
//         >
//           <Text style={{ color: "white" }}>+ New Task</Text>
//         </Pressable>
//       </View>

//       <ScrollView className="flex-1">
//         <Text>
//           Local government in Sri Lanka is the third tier of governance,
//           following the central government and provincial councils, focusing on
//           local public services like roads, sanitation, and waste collection. It
//           consists of 341 local authorities—municipal councils, urban councils,
//           and Pradeshiya Sabhas—which operate under the guidance of the Ministry
//           of Provincial Councils and Local Government and provincial councils.
//           Wikipedia Wikipedia +2 Structure of Local Government (Third Tier)
//           There are 341 local authorities, categorized by area, that are
//           responsible for the comfort and convenience of the community: Asian
//           Development Bank Asian Development Bank +1 Municipal Councils (24):
//           Govern major cities. Urban Councils (41): Govern smaller developed
//           towns. Pradeshiya Sabhas (276): Govern rural, localized areas. Asian
//           Development Bank Asian Development Bank +1 Key Responsibilities and
//           Functions Local authorities are tasked with providing essential
//           services and improving the quality of life, including: Public Health &
//           Sanitation: Maintaining drainage systems, managing waste collection,
//           and promoting health. Infrastructure: Constructing and maintaining
//           local roads, street lighting, and public parks. Amenities: Providing
//           libraries, public markets, and recreation facilities. Regulation:
//           Issuing licenses, regulating constructions, and controlling public
//           nuisances. Wikipedia Wikipedia +4 Legal Framework and Oversight 13th
//           Amendment: Following the 13th Amendment to the Constitution, local
//           government is a devolved subject, and these authorities are largely
//           supervised by Provincial Councils. Laws: They operate under the
//           Municipal Councils Ordinance (1947), Urban Councils Ordinance (1939),
//           and Pradeshiya Sabhas Act (1987). mpclg.gov.lk mpclg.gov.lk Funding
//           and Elections Local authorities generate revenue through local taxes,
//           rates, rents, and fees, while also receiving funds from the central
//           and provincial governments. Members of local councils are elected by
//           voters. Election Commission of Sri lanka Election Commission of Sri
//           lanka +2 Key Entities Ministry of Provincial Councils and Local
//           Government: Key national authority. Department of Local Government
//           (Central Province): Example of provincial management. Chief
//           Secretary's Office - Central Province Chief Secretary's Office -
//           Central Province +2 Note: The number of local authorities can vary
//           across different sources; official figuLocal government in Sri Lanka
//           is the third tier of governance, following the central government and
//           provincial councils, focusing on local public services like roads,
//           sanitation, and waste collection. It consists of 341 local
//           authorities—municipal councils, urban councils, and Pradeshiya
//           Sabhas—which operate under the guidance of the Ministry of Provincial
//           Councils and Local Government and provincial councils. Wikipedia
//           Wikipedia +2 Structure of Local Government (Third Tier) There are 341
//           local authorities, categorized by area, that are responsible for the
//           comfort and convenience of the community: Asian Development Bank Asian
//           Development Bank +1 Municipal Councils (24): Govern major cities.
//           Urban Councils (41): Govern smaller developed towns. Pradeshiya Sabhas
//           (276): Govern rural, localized areas. Asian Development Bank Asian
//           Development Bank +1 Key Responsibilities and Functions Local
//           authorities are tasked with providing essential services and improving
//           the quality of life, including: Public Health & Sanitation:
//           Maintaining drainage systems, managing waste collection, and promoting
//           health. Infrastructure: Constructing and maintaining local roads,
//           street lighting, and public parks. Amenities: Providing libraries,
//           public markets, and recreation facilities. Regulation: Issuing
//           licenses, regulating constructions, and controlling public nuisances.
//           Wikipedia Wikipedia +4 Legal Framework and Oversight 13th Amendment:
//           Following the 13th Amendment to the Constitution, local government is
//           a devolved subject, and these authorities are largely supervised by
//           Provincial Councils. Laws: They operate under the Municipal Councils
//           Ordinance (1947), Urban Councils Ordinance (1939), and Pradeshiya
//           Sabhas Act (1987). mpclg.gov.lk mpclg.gov.lk Funding and Elections
//           Local authorities generate revenue through local taxes, rates, rents,
//           and fees, while also receiving funds from the central and provincial
//           governments. Members of local councils are elected by voters. Election
//           Commission of Sri lanka Election Commission of Sri lanka +2 Key
//           Entities Ministry of Provincial Councils and Local Government: Key
//           national authority. Department of Local Government (Central Province):
//           Example of provincial management. Chief Secretary's Office - Central
//           Province Chief Secretary's Office - Central Province +2 Note: The
//           number of local authorities can vary across different sources;
//           official figuLocal government in Sri Lanka is the third tier of
//           governance, following the central government and provincial councils,
//           focusing on local public services like roads, sanitation, and waste
//           collection. It consists of 341 local authorities—municipal councils,
//           urban councils, and Pradeshiya Sabhas—which operate under the guidance
//           of the Ministry of Provincial Councils and Local Government and
//           provincial councils. Wikipedia Wikipedia +2 Structure of Local
//           Government (Third Tier) There are 341 local authorities, categorized
//           by area, that are responsible for the comfort and convenience of the
//           community: Asian Development Bank Asian Development Bank +1 Municipal
//           Councils (24): Govern major cities. Urban Councils (41): Govern
//           smaller developed towns. Pradeshiya Sabhas (276): Govern rural,
//           localized areas. Asian Development Bank Asian Development Bank +1 Key
//           Responsibilities and Functions Local authorities are tasked with
//           providing essential services and improving the quality of life,
//           including: Public Health & Sanitation: Maintaining drainage systems,
//           managing waste collection, and promoting health. Infrastructure:
//           Constructing and maintaining local roads, street lighting, and public
//           parks. Amenities: Providing libraries, public markets, and recreation
//           facilities. Regulation: Issuing licenses, regulating constructions,
//           and controlling public nuisances. Wikipedia Wikipedia +4 Legal
//           Framework and Oversight 13th Amendment: Following the 13th Amendment
//           to the Constitution, local government is a devolved subject, and these
//           authorities are largely supervised by Provincial Councils. Laws: They
//           operate under the Municipal Councils Ordinance (1947), Urban Councils
//           Ordinance (1939), and Pradeshiya Sabhas Act (1987). mpclg.gov.lk
//           mpclg.gov.lk Funding and Elections Local authorities generate revenue
//           through local taxes, rates, rents, and fees, while also receiving
//           funds from the central and provincial governments. Members of local
//           councils are elected by voters. Election Commission of Sri lanka
//           Election Commission of Sri lanka +2 Key Entities Ministry of
//           Provincial Councils and Local Government: Key national authority.
//           Department of Local Government (Central Province): Example of
//           provincial management. Chief Secretary's Office - Central Province
//           Chief Secretary's Office - Central Province +2 Note: The number of
//           local authorities can vary across different sources; official
//           figuLocal government in Sri Lanka is the third tier of governance,
//           following the central government and provincial councils, focusing on
//           local public services like roads, sanitation, and waste collection. It
//           consists of 341 local authorities—municipal councils, urban councils,
//           and Pradeshiya Sabhas—which operate under the guidance of the Ministry
//           of Provincial Councils and Local Government and provincial councils.
//           Wikipedia Wikipedia +2 Structure of Local Government (Third Tier)
//           There are 341 local authorities, categorized by area, that are
//           responsible for the comfort and convenience of the community: Asian
//           Development Bank Asian Development Bank +1 Municipal Councils (24):
//           Govern major cities. Urban Councils (41): Govern smaller developed
//           towns. Pradeshiya Sabhas (276): Govern rural, localized areas. Asian
//           Development Bank Asian Development Bank +1 Key Responsibilities and
//           Functions Local authorities are tasked with providing essential
//           services and improving the quality of life, including: Public Health &
//           Sanitation: Maintaining drainage systems, managing waste collection,
//           and promoting health. Infrastructure: Constructing and maintaining
//           local roads, street lighting, and public parks. Amenities: Providing
//           libraries, public markets, and recreation facilities. Regulation:
//           Issuing licenses, regulating constructions, and controlling public
//           nuisances. Wikipedia Wikipedia +4 Legal Framework and Oversight 13th
//           Amendment: Following the 13th Amendment to the Constitution, local
//           government is a devolved subject, and these authorities are largely
//           supervised by Provincial Councils. Laws: They operate under the
//           Municipal Councils Ordinance (1947), Urban Councils Ordinance (1939),
//           and Pradeshiya Sabhas Act (1987). mpclg.gov.lk mpclg.gov.lk Funding
//           and Elections Local authorities generate revenue through local taxes,
//           rates, rents, and fees, while also receiving funds from the central
//           and provincial governments. Members of local councils are elected by
//           voters. Election Commission of Sri lanka Election Commission of Sri
//           lanka +2 Key Entities Ministry of Provincial Councils and Local
//           Government: Key national authority. Department of Local Government
//           (Central Province): Example of provincial management. Chief
//           Secretary's Office - Central Province Chief Secretary's Office -
//           Central Province +2 Note: The number of local authorities can vary
//           across different sources; official figuLocal government in Sri Lanka
//           is the third tier of governance, following the central government and
//           provincial councils, focusing on local public services like roads,
//           sanitation, and waste collection. It consists of 341 local
//           authorities—municipal councils, urban councils, and Pradeshiya
//           Sabhas—which operate under the guidance of the Ministry of Provincial
//           Councils and Local Government and provincial councils. Wikipedia
//           Wikipedia +2 Structure of Local Government (Third Tier) There are 341
//           local authorities, categorized by area, that are responsible for the
//           comfort and convenience of the community: Asian Development Bank Asian
//           Development Bank +1 Municipal Councils (24): Govern major cities.
//           Urban Councils (41): Govern smaller developed towns. Pradeshiya Sabhas
//           (276): Govern rural, localized areas. Asian Development Bank Asian
//           Development Bank +1 Key Responsibilities and Functions Local
//           authorities are tasked with providing essential services and improving
//           the quality of life, including: Public Health & Sanitation:
//           Maintaining drainage systems, managing waste collection, and promoting
//           health. Infrastructure: Constructing and maintaining local roads,
//           street lighting, and public parks. Amenities: Providing libraries,
//           public markets, and recreation facilities. Regulation: Issuing
//           licenses, regulating constructions, and controlling public nuisances.
//           Wikipedia Wikipedia +4 Legal Framework and Oversight 13th Amendment:
//           Following the 13th Amendment to the Constitution, local government is
//           a devolved subject, and these authorities are largely supervised by
//           Provincial Councils. Laws: They operate under the Municipal Councils
//           Ordinance (1947), Urban Councils Ordinance (1939), and Pradeshiya
//           Sabhas Act (1987). mpclg.gov.lk mpclg.gov.lk Funding and Elections
//           Local authorities generate revenue through local taxes, rates, rents,
//           and fees, while also receiving funds from the central and provincial
//           governments. Members of local councils are elected by voters. Election
//           Commission of Sri lanka Election Commission of Sri lanka +2 Key
//           Entities Ministry of Provincial Councils and Local Government: Key
//           national authority. Department of Local Government (Central Province):
//           Example of provincial management. Chief Secretary's Office - Central
//           Province Chief Secretary's Office - Central Province +2 Note: The
//           number of local authorities can vary across different sources;
//           official figuLocal government in Sri Lanka is the third tier of
//           governance, following the central government and provincial councils,
//           focusing on local public services like roads, sanitation, and waste
//           collection. It consists of 341 local authorities—municipal councils,
//           urban councils, and Pradeshiya Sabhas—which operate under the guidance
//           of the Ministry of Provincial Councils and Local Government and
//           provincial councils. Wikipedia Wikipedia +2 Structure of Local
//           Government (Third Tier) There are 341 local authorities, categorized
//           by area, that are responsible for the comfort and convenience of the
//           community: Asian Development Bank Asian Development Bank +1 Municipal
//           Councils (24): Govern major cities. Urban Councils (41): Govern
//           smaller developed towns. Pradeshiya Sabhas (276): Govern rural,
//           localized areas. Asian Development Bank Asian Development Bank +1 Key
//           Responsibilities and Functions Local authorities are tasked with
//           providing essential services and improving the quality of life,
//           including: Public Health & Sanitation: Maintaining drainage systems,
//           managing waste collection, and promoting health. Infrastructure:
//           Constructing and maintaining local roads, street lighting, and public
//           parks. Amenities: Providing libraries, public markets, and recreation
//           facilities. Regulation: Issuing licenses, regulating constructions,
//           and controlling public nuisances. Wikipedia Wikipedia +4 Legal
//           Framework and Oversight 13th Amendment: Following the 13th Amendment
//           to the Constitution, local government is a devolved subject, and these
//           authorities are largely supervised by Provincial Councils. Laws: They
//           operate under the Municipal Councils Ordinance (1947), Urban Councils
//           Ordinance (1939), and Pradeshiya Sabhas Act (1987). mpclg.gov.lk
//           mpclg.gov.lk Funding and Elections Local authorities generate revenue
//           through local taxes, rates, rents, and fees, while also receiving
//           funds from the central and provincial governments. Members of local
//           councils are elected by voters. Election Commission of Sri lanka
//           Election Commission of Sri lanka +2 Key Entities Ministry of
//           Provincial Councils and Local Government: Key national authority.
//           Department of Local Government (Central Province): Example of
//           provincial management. Chief Secretary's Office - Central Province
//           Chief Secretary's Office - Central Province +2 Note: The number of
//           local authorities can vary across different sources; official
//           figuLocal government in Sri Lanka is the third tier of governance,
//           following the central government and provincial councils, focusing on
//           local public services like roads, sanitation, and waste collection. It
//           consists of 341 local authorities—municipal councils, urban councils,
//           and Pradeshiya Sabhas—which operate under the guidance of the Ministry
//           of Provincial Councils and Local Government and provincial councils.
//           Wikipedia Wikipedia +2 Structure of Local Government (Third Tier)
//           There are 341 local authorities, categorized by area, that are
//           responsible for the comfort and convenience of the community: Asian
//           Development Bank Asian Development Bank +1 Municipal Councils (24):
//           Govern major cities. Urban Councils (41): Govern smaller developed
//           towns. Pradeshiya Sabhas (276): Govern rural, localized areas. Asian
//           Development Bank Asian Development Bank +1 Key Responsibilities and
//           Functions Local authorities are tasked with providing essential
//           services and improving the quality of life, including: Public Health &
//           Sanitation: Maintaining drainage systems, managing waste collection,
//           and promoting health. Infrastructure: Constructing and maintaining
//           local roads, street lighting, and public parks. Amenities: Providing
//           libraries, public markets, and recreation facilities. Regulation:
//           Issuing licenses, regulating constructions, and controlling public
//           nuisances. Wikipedia Wikipedia +4 Legal Framework and Oversight 13th
//           Amendment: Following the 13th Amendment to the Constitution, local
//           government is a devolved subject, and these authorities are largely
//           supervised by Provincial Councils. Laws: They operate under the
//           Municipal Councils Ordinance (1947), Urban Councils Ordinance (1939),
//           and Pradeshiya Sabhas Act (1987). mpclg.gov.lk mpclg.gov.lk Funding
//           and Elections Local authorities generate revenue through local taxes,
//           rates, rents, and fees, while also receiving funds from the central
//           and provincial governments. Members of local councils are elected by
//           voters. Election Commission of Sri lanka Election Commission of Sri
//           lanka +2 Key Entities Ministry of Provincial Councils and Local
//           Government: Key national authority. Department of Local Government
//           (Central Province): Example of provincial management. Chief
//           Secretary's Office - Central Province Chief Secretary's Office -
//           Central Province +2 Note: The number of local authorities can vary
//           across different sources; official figu
//         </Text>
//       </ScrollView>
//     </View>
//   );
// }

// import { View } from "react-native";

// export default function TasksList() {
//   return <View>TasksList</View>;
// }

// import { Ionicons } from "@expo/vector-icons";
// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// // Types
// type Priority = "high" | "medium" | "low";
// type CategoryId = "all" | "work" | "personal" | "shopping" | "health";

// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   category: CategoryId;
//   date: Date;
//   completed: boolean;
//   priority: Priority;
// }

// interface Category {
//   id: CategoryId;
//   name: string;
//   icon: keyof typeof Ionicons.glyphMap;
//   color: string;
// }

// interface CategorizedTasks {
//   previous: Task[];
//   today: Task[];
//   future: Task[];
// }

// // Constants
// const CATEGORIES: Category[] = [
//   { id: "all", name: "All", icon: "apps", color: "#6B7280" },
//   { id: "work", name: "Work", icon: "briefcase", color: "#3B82F6" },
//   { id: "personal", name: "Personal", icon: "person", color: "#8B5CF6" },
//   { id: "shopping", name: "Shopping", icon: "cart", color: "#10B981" },
//   { id: "health", name: "Health", icon: "fitness", color: "#EF4444" },
// ];

// const SAMPLE_TASKS: Task[] = [
//   {
//     id: "1",
//     title: "Team Meeting",
//     description: "Discuss project timeline",
//     category: "work",
//     date: new Date(2026, 3, 20),
//     completed: true,
//     priority: "high",
//   },
//   {
//     id: "2",
//     title: "Grocery Shopping",
//     description: "Buy vegetables and fruits",
//     category: "personal",
//     date: new Date(2026, 3, 21),
//     completed: false,
//     priority: "medium",
//   },
//   {
//     id: "3",
//     title: "Code Review",
//     description: "Review pull requests",
//     category: "work",
//     date: new Date(2026, 3, 22),
//     completed: false,
//     priority: "high",
//   },
//   {
//     id: "4",
//     title: "Gym Workout",
//     description: "Leg day routine",
//     category: "personal",
//     date: new Date(2026, 3, 22),
//     completed: false,
//     priority: "low",
//   },
//   {
//     id: "5",
//     title: "Doctor Appointment",
//     description: "Annual checkup",
//     category: "health",
//     date: new Date(2026, 3, 25),
//     completed: false,
//     priority: "medium",
//   },
//   {
//     id: "6",
//     title: "Deploy Updates",
//     description: "Deploy to production",
//     category: "work",
//     date: new Date(2026, 3, 26),
//     completed: false,
//     priority: "high",
//   },
// ];

// // Component Props
// interface TaskItemProps {
//   task: Task;
//   onToggle: (taskId: string) => void;
// }

// interface TaskSectionProps {
//   title: string;
//   tasks: Task[];
//   icon: keyof typeof Ionicons.glyphMap;
//   onToggle: (taskId: string) => void;
// }

// export default function TaskListComponent() {
//   const [selectedCategory, setSelectedCategory] = useState<CategoryId>("all");
//   const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS);

//   const today = new Date(2026, 3, 22);
//   today.setHours(0, 0, 0, 0);

//   const toggleTaskComplete = (taskId: string): void => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === taskId ? { ...task, completed: !task.completed } : task,
//       ),
//     );
//   };

//   const filterTasks = (category: CategoryId): Task[] => {
//     if (category === "all") return tasks;
//     return tasks.filter((task) => task.category === category);
//   };

//   const categorizeByDate = (taskList: Task[]): CategorizedTasks => {
//     const previous: Task[] = [];
//     const todayTasks: Task[] = [];
//     const future: Task[] = [];

//     taskList.forEach((task) => {
//       const taskDate = new Date(task.date);
//       taskDate.setHours(0, 0, 0, 0);

//       if (taskDate < today) {
//         previous.push(task);
//       } else if (taskDate.getTime() === today.getTime()) {
//         todayTasks.push(task);
//       } else {
//         future.push(task);
//       }
//     });

//     return { previous, today: todayTasks, future };
//   };

//   const getPriorityColor = (priority: Priority): string => {
//     switch (priority) {
//       case "high":
//         return "#EF4444";
//       case "medium":
//         return "#F59E0B";
//       case "low":
//         return "#10B981";
//       default:
//         return "#6B7280";
//     }
//   };

//   const filteredTasks = filterTasks(selectedCategory);
//   const categorizedTasks = categorizeByDate(filteredTasks);

//   // Task Item Component
//   const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
//     const categoryData = CATEGORIES.find((c) => c.id === task.category);

//     return (
//       <TouchableOpacity
//         style={[styles.taskCard, task.completed && styles.taskCardCompleted]}
//         onPress={() => onToggle(task.id)}
//         activeOpacity={0.7}
//       >
//         <View style={styles.taskLeft}>
//           <TouchableOpacity
//             style={[
//               styles.checkbox,
//               task.completed && styles.checkboxCompleted,
//               { borderColor: categoryData?.color || "#6B7280" },
//               task.completed && {
//                 backgroundColor: categoryData?.color || "#6B7280",
//               },
//             ]}
//             onPress={() => onToggle(task.id)}
//           >
//             {task.completed && (
//               <Ionicons name="checkmark" size={18} color="#FFF" />
//             )}
//           </TouchableOpacity>

//           <View style={styles.taskInfo}>
//             <Text
//               style={[
//                 styles.taskTitle,
//                 task.completed && styles.taskTitleCompleted,
//               ]}
//             >
//               {task.title}
//             </Text>
//             <Text style={styles.taskDescription}>{task.description}</Text>

//             <View style={styles.taskMeta}>
//               <View
//                 style={[
//                   styles.categoryBadge,
//                   { backgroundColor: `${categoryData?.color}20` },
//                 ]}
//               >
//                 <Ionicons
//                   name={categoryData?.icon || "apps"}
//                   size={12}
//                   color={categoryData?.color}
//                 />
//                 <Text
//                   style={[styles.categoryText, { color: categoryData?.color }]}
//                 >
//                   {categoryData?.name}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         <View
//           style={[
//             styles.priorityDot,
//             { backgroundColor: getPriorityColor(task.priority) },
//           ]}
//         />
//       </TouchableOpacity>
//     );
//   };

//   // Task Section Component
//   const TaskSection: React.FC<TaskSectionProps> = ({
//     title,
//     tasks,
//     icon,
//     onToggle,
//   }) => {
//     if (tasks.length === 0) return null;

//     return (
//       <View style={styles.section}>
//         <View style={styles.sectionHeader}>
//           <Ionicons name={icon} size={20} color="#6B7280" />
//           <Text style={styles.sectionTitle}>{title}</Text>
//           <View style={styles.badge}>
//             <Text style={styles.badgeText}>{tasks.length}</Text>
//           </View>
//         </View>
//         {tasks.map((task) => (
//           <TaskItem key={task.id} task={task} onToggle={onToggle} />
//         ))}
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       {/* <View style={styles.header}>
//         <View>
//           <Text style={styles.greeting}>Hello! 👋</Text>
//           <Text style={styles.headerTitle}>Your Tasks</Text>
//         </View>
//         <TouchableOpacity style={styles.addButton}>
//           <Ionicons name="add" size={24} color="#FFF" />
//         </TouchableOpacity>
//       </View> */}

//       {/* Category Filter */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.categoryScroll}
//         contentContainerStyle={styles.categoryContainer}
//       >
//         {CATEGORIES.map((category) => (
//           <TouchableOpacity
//             key={category.id}
//             style={[
//               styles.categoryChip,
//               selectedCategory === category.id && {
//                 backgroundColor: category.color,
//               },
//             ]}
//             onPress={() => setSelectedCategory(category.id)}
//           >
//             <Ionicons
//               name={category.icon}
//               size={18}
//               color={selectedCategory === category.id ? "#FFF" : category.color}
//             />
//             <Text
//               style={[
//                 styles.categoryChipText,
//                 selectedCategory === category.id &&
//                   styles.categoryChipTextActive,
//               ]}
//             >
//               {category.name}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Task Lists */}
//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <TaskSection
//           title="Today"
//           tasks={categorizedTasks.today}
//           icon="today"
//           onToggle={toggleTaskComplete}
//         />

//         <TaskSection
//           title="Upcoming"
//           tasks={categorizedTasks.future}
//           icon="calendar"
//           onToggle={toggleTaskComplete}
//         />

//         <TaskSection
//           title="Previous"
//           tasks={categorizedTasks.previous}
//           icon="time"
//           onToggle={toggleTaskComplete}
//         />

//         {/* Empty State */}
//         {filteredTasks.length === 0 && (
//           <View style={styles.emptyState}>
//             <Ionicons name="checkmark-done-circle" size={64} color="#E5E7EB" />
//             <Text style={styles.emptyTitle}>No tasks found</Text>
//             <Text style={styles.emptySubtitle}>
//               Try changing the category filter
//             </Text>
//           </View>
//         )}

//         <View style={{ height: 20 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F9FAFB",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     backgroundColor: "#FFF",
//   },
//   greeting: {
//     fontSize: 14,
//     color: "#6B7280",
//     marginBottom: 4,
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#111827",
//   },
//   addButton: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: "#3B82F6",
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#3B82F6",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   categoryScroll: {
//     backgroundColor: "#FFF",
//     borderBottomWidth: 1,
//     borderBottomColor: "#F3F4F6",
//     height: 12,
//   },
//   categoryContainer: {
//     height: 135,
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     gap: 10,
//   },
//   categoryChip: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: "#F3F4F6",
//     gap: 6,
//   },
//   categoryChipText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#6B7280",
//   },
//   categoryChipTextActive: {
//     color: "#FFF",
//   },
//   scrollView: {
//     flex: 1,
//     height: 12,
//   },
//   scrollContent: {
//     paddingTop: 10,
//   },
//   section: {
//     marginBottom: 4,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     gap: 8,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#374151",
//     flex: 1,
//   },
//   badge: {
//     backgroundColor: "#E5E7EB",
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 12,
//   },
//   badgeText: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#6B7280",
//   },
//   taskCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#FFF",
//     marginHorizontal: 20,
//     marginBottom: 10,
//     padding: 16,
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   taskCardCompleted: {
//     opacity: 0.6,
//   },
//   taskLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//     gap: 12,
//   },
//   checkbox: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     borderWidth: 2,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   checkboxCompleted: {
//     borderColor: "transparent",
//   },
//   taskInfo: {
//     flex: 1,
//   },
//   taskTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#111827",
//     marginBottom: 4,
//   },
//   taskTitleCompleted: {
//     textDecorationLine: "line-through",
//     color: "#9CA3AF",
//   },
//   taskDescription: {
//     fontSize: 14,
//     color: "#6B7280",
//     marginBottom: 8,
//   },
//   taskMeta: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   categoryBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 6,
//     gap: 4,
//   },
//   categoryText: {
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   priorityDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//   },
//   emptyState: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 60,
//   },
//   emptyTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#6B7280",
//     marginTop: 16,
//   },
//   emptySubtitle: {
//     fontSize: 14,
//     color: "#9CA3AF",
//     marginTop: 8,
//   },
// });

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";
import React from "react";

export default function Settings() {
  return (
    <ScrollView className="flex-1 bg-[#f1f1f1] ">
      <Text className="text-base text-[#6B7280] m-4 "> GENERAL </Text>

      <View className="rounded-xl bg-white mx-4">
        <TouchableOpacity className="flex-row items-center justify-between p-4    ">
          <View className="flex-row items-center gap-4">
            <View className=" w-[36px] h-[36px] rounded-xl bg-[#F3F4F6] items-center justify-center mr-3  ">
              <MaterialIcons name="account-circle" size={22} color={"#111"} />
            </View>
            <Text className="text-lg  text-[#111827] ">Account</Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between p-4    ">
          <View className="flex-row items-center gap-4">
            <View className=" w-[36px] h-[36px] rounded-xl bg-[#F3F4F6] items-center justify-center mr-3  ">
              <MaterialIcons name="account-circle" size={22} color={"#111"} />
            </View>
            <Text className="text-lg  text-[#111827] ">Notification</Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <Text className="text-base text-[#6B7280] m-4 "> APP </Text>

      <View className="rounded-xl bg-white mx-4">
        <TouchableOpacity className="flex-row items-center justify-between p-4    ">
          <View className="flex-row items-center gap-4">
            <View className=" w-[36px] h-[36px] rounded-xl bg-[#F3F4F6] items-center justify-center mr-3  ">
              <MaterialIcons name="account-circle" size={22} color={"#111"} />
            </View>
            <Text className="text-lg  text-[#111827] ">Schedule View</Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/settings/categories")}
          className="flex-row items-center justify-between p-4    "
        >
          <View className="flex-row items-center gap-4">
            <View className=" w-[36px] h-[36px] rounded-xl bg-[#F3F4F6] items-center justify-center mr-3  ">
              <MaterialIcons name="account-circle" size={22} color={"#111"} />
            </View>
            <Text className="text-lg  text-[#111827] ">Categories</Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/settings/theme")}
          className="flex-row items-center justify-between p-4    "
        >
          <View className="flex-row items-center gap-4">
            <View className=" w-[36px] h-[36px] rounded-xl bg-[#F3F4F6] items-center justify-center mr-3  ">
              <MaterialIcons name="account-circle" size={22} color={"#111"} />
            </View>
            <Text className="text-lg  text-[#111827] ">Theme</Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <Text className="text-base text-[#6B7280] m-4 "> ABOUT </Text>

      <View className="rounded-xl bg-white mx-4">
        <TouchableOpacity className="flex-row items-center justify-between p-4    ">
          <View className="flex-row items-center gap-4">
            <View className=" w-[36px] h-[36px] rounded-xl bg-[#F3F4F6] items-center justify-center mr-3  ">
              <MaterialIcons name="account-circle" size={22} color={"#111"} />
            </View>
            <Text className="text-lg  text-[#111827] ">About App</Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between p-4    ">
          <View className="flex-row items-center gap-4">
            <View className=" w-[36px] h-[36px] rounded-xl bg-[#F3F4F6] items-center justify-center mr-3  ">
              <MaterialIcons name="account-circle" size={22} color={"#111"} />
            </View>
            <Text className="text-lg  text-[#111827] ">Help & Support</Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
