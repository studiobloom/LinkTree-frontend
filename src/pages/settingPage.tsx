// src/pages/SettingsPage.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { useGetMyUser, useUpdateMyUser } from '../api/UserApi';
import Sidebar from '../components/Sidebar';
import ImageForm, { ImageFormData } from '../forms/manageimgForm';
import { toast } from "sonner";

const SettingsPage = () => {
  const { logout } = useAuth0();
  const { currentUser, isLoading: isUserLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdating } = useUpdateMyUser();

  const handleSaveAvatar = async (formData: ImageFormData) => {
    try {
      await updateUser({ imageFile: formData.imageFile });
      toast.success("Avatar updated successfully");
    } catch (error) {
      toast.error("Failed to update avatar");
    }
  };
 
  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      <Sidebar email={currentUser?.email} />
     
      <div className="flex-1 p-10">
        <div className="mb-4 bg-gray-700 p-4 rounded-md">
          <ImageForm onSave={handleSaveAvatar} isLoading={isUpdating} />
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