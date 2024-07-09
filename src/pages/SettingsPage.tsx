// src/pages/SettingsPage.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { useGetMyUser } from '../api/UserApi';
import NoAvatar from '../assets/noavatar.jpg';
import Sidebar from '../components/Sidebar';

const SettingsPage = () => {
  const { logout } = useAuth0();
  const { currentUser, isLoading: isUserLoading } = useGetMyUser();

  return (
    <div className="flex flex-col  md:flex-row h-screen bg-gray-900 text-white">
      <Sidebar email={currentUser?.email} />

      {/* Main content */}
      <div className="flex-1 p-10">
        <div className="mb-4 bg-gray-700 p-4 rounded-md">
          <h2 className="text-xl font-bold mb-4">Update Avatar</h2>
          <div className="flex items-center">
            <img
              className="w-24 h-24 rounded-full"
              src={NoAvatar}
              alt="Avatar"
            />
            <input
              type="file"
              accept="image/*"
              className="ml-4"
            />
            <button
              className="ml-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-200"
            >
              Upload
            </button>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-md mt-4">
          <h2 className="text-xl font-bold mb-4">Logout</h2>
          <button
            onClick={() => logout()}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
