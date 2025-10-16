// // layouts/StudentLayout.tsx
// import { Outlet, useNavigate, useLoaderData } from "react-router";
// import { useEffect } from "react";
// import type { Route } from "./+types/StudentLayout";

// // Loader cho layout
// export async function loader({ request }: Route.LoaderArgs) {
//   const token = localStorage.getItem('token');
//   const userStr = localStorage.getItem('user');

//   if (!token || !userStr) {
//     return { isAuthenticated: false, user: null };
//   }

//   const user = JSON.parse(userStr);
  
//   // Kiểm tra role
//   if (user.role !== 'student') {
//     return { isAuthenticated: false, user: null };
//   }

//   return { isAuthenticated: true, user };
// }

// export default function StudentLayout() {
//   const navigate = useNavigate();
//   const { isAuthenticated, user } = useLoaderData<typeof loader>();

//   useEffect(() => {  
//     if (!isAuthenticated) {
//       navigate('/login');
//     }
//   }, [isAuthenticated, navigate]);

//   if (!isAuthenticated) {
//     return null; // Hoặc loading spinner
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold">Student Portal</h1>
//           <div className="flex items-center gap-4">
//             <span>{user.name}</span>
//             <button 
//               onClick={() => {
//                 localStorage.removeItem('token');
//                 localStorage.removeItem('user');
//                 navigate('/login');
//               }}
//               className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="flex">
//         {/* Sidebar */}
//         <aside className="w-64 bg-white shadow-sm min-h-screen p-4">
//           <nav className="space-y-2">
//             <NavItem to="/student/dashboard" label="Dashboard" />
//             <NavItem to="/student/my-courses" label="My Courses" />
//             <NavItem to="/student/profile" label="Profile" />
//             <NavItem to="/student/settings" label="Settings" />
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// // NavItem component
// import { NavLink } from "react-router";

// function NavItem({ to, label }: { to: string; label: string }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `block px-4 py-2 rounded transition-colors ${
//           isActive
//             ? "bg-blue-600 text-white"
//             : "text-gray-700 hover:bg-gray-100"
//         }`
//       }
//     >
//       {label}
//     </NavLink>
//   );
// }