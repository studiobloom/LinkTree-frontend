// src/pages/AdminPage.tsx
import { useState } from 'react';
import { useGetMyUser, useUpdateMyUser } from '../api/UserApi';
import RenderUserForm from '../components/renderUserForm';
import { UserNameData } from '../forms/addUserNameForm';

const AdminPage = () => {
  // get the currentUser information
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  // to handle the updateuser 
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  const [isAddingUserName, setIsAddingUserName] = useState(false);

  // control the Userpopup form 
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const handleSaveUserName = async (data: UserNameData) => {

    setIsAddingUserName(true);
    setError(null);  // Clear any previous errors
    try {
      // update the user
      await updateUser({ name: data.username });
      //close the username popup form  
      setIsUserDialogOpen(false);
      window.location.reload();
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from server. Please check your connection and try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error updating user name:", error.message);
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsAddingUserName(false);
    }
  };

  if (isGetLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser || !currentUser.name) {
    return (
      <RenderUserForm
        onSave={handleSaveUserName}
        isLoading={isAddingUserName || isUpdateLoading}
        onOpenChange={setIsUserDialogOpen}
        isOpen={isUserDialogOpen}
        error={error}
      />
    );
  }

  return (
    <div>
      <h1>Welcome, {currentUser.name}</h1>
    </div>
  );
};

export default AdminPage;
