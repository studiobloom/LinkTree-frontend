// src/components/Sidebar.tsx
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  email: string | undefined;
}

const Sidebar = ({ email }: SidebarProps) => {
  return (
    <div className="bg-gray-800 min-w-[280px] md:min-w-[280px]" id="sidebar">
      <div className="p-4">
        <h1 className="text-xl font-bold text-white">EchoLink Dashboard</h1>
        <h1>{email}</h1>
      </div>
      <nav className="mt-4 flex flex-col">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "block py-2 px-4 text-white bg-purple-600 font-medium"
              : "block py-2 px-4 text-gray-400 hover:bg-gray-700"
          }
        >
          Links
        </NavLink>
       
        <div className="block py-2 px-4 text-gray-500 cursor-not-allowed">
          <div className="flex items-center justify-between">
            <span>Analytics</span>
            <span className="text-xs text-red-500 font-semibold">Coming Soon</span>
          </div>
        </div>

        <NavLink
          to="/setting"
          className={({ isActive }) =>
            isActive
              ? "block py-2 px-4 text-white bg-purple-600 font-medium"
              : "block py-2 px-4 text-gray-400 hover:bg-gray-700"
          }
        >
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;