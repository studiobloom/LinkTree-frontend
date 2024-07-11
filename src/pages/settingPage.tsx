// src/pages/SettingsPage.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { useGetMyUser, useUpdateMyUser } from '../api/UserApi';
import Sidebar from '../components/Sidebar';
import ImageForm, { ImageFormData } from '../forms/manageimgForm';
import { toast } from "sonner";
import LoadingIcons from "react-loading-icons";

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
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <LoadingIcons.Puff stroke="#98ff98" strokeOpacity={.125} height="100" width="100" />
        <span className="text-white mt-2 text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      <Sidebar email={currentUser?.email} />
     
      <div className="flex-1 p-3 flex justify-center">
  <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <div className="p-6 border-b border-gray-700">
      <h2 className="text-xl font-semibold text-white mb-4">Update Avatar</h2>
      <ImageForm onSave={handleSaveAvatar} isLoading={isUpdating} />
    </div>
    <div className="p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Account Actions</h2>
      <button
        onClick={() => logout()}
        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
      >
        Logout
      </button>
    </div>
  </div>
</div>
    </div>
  );
};

export default SettingsPage;