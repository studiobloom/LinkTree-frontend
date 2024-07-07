// src/pages/LinksPage.tsx

import { useState } from 'react';
import AddLinkButton from '../components/AddLinkButtonProps';
import LinksForm, { LinksFormData } from '../forms/LinksForm';
import { useGetMyUser, useUpdateMyUser } from '../api/UserApi';
import { useCreateLinks, useGetLinks, useUpdateLinks, useDeleteLink } from '../api/LinksApi';  // Adjusted import statement
import { toast } from 'sonner';
import Noavater from '../assets/noavatar.jpg';
import RenderUserForm from '../components/renderUserForm';
import { UserNameData } from '../forms/addUserNameForm';
import { Dialog, DialogContent } from '../components/Dialog';

const LinksPage = () => {
  const { currentUser, isLoading: isUserLoading } = useGetMyUser();
  const { mutateAsync: createLink, isLoading: isCreateLoading } = useCreateLinks();
  const { mutateAsync: updateLink, isLoading: isUpdateLoading } = useUpdateLinks();
  const { mutateAsync: deleteLink, isLoading: isDeleteLoading } = useDeleteLink();  // Added delete mutation
  const { data: links, isLoading: isLinksLoading, refetch: refetchLinks } = useGetLinks();

  const [isAddingUserName, setIsAddingUserName] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editLinkData, setEditLinkData] = useState<LinksFormData & { linkId: string } | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(true);

  const { updateUser, isLoading: isUserUpdateLoading } = useUpdateMyUser();

  const addLink = async (data: LinksFormData) => {
    try {
      await createLink(data);
      await refetchLinks();
      toast.success('Link added successfully');
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Failed to add link');
    }
  };

  const editLink = async (data: LinksFormData) => {
    if (!editLinkData) return;
    try {
      await updateLink({ linkId: editLinkData.linkId, ...data });
      await refetchLinks();
      toast.success('Link updated successfully');
      setIsEditDialogOpen(false);
    } catch (error) {
      toast.error('Failed to update link');
    }
  };

  const handleEditClick = (link: Link) => {
    setEditLinkData({ ...link, linkId: link._id });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = async (linkId: string) => {
    try {
      await deleteLink(linkId);
      await refetchLinks();
      toast.success('Link deleted successfully');
    } catch (error) {
      toast.error('Failed to delete link');
    }
  };

  const handleSaveUserName = async (data: UserNameData) => {
    setIsAddingUserName(true);
    setError(null); // Clear any previous errors
    try {
      await updateUser({ name: data.username.toLowerCase() });
      setIsUserDialogOpen(false);
      window.location.reload();
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("No response from server. Please check your connection and try again.");
      } else {
        console.error("Error updating user name:", error.message);
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsAddingUserName(false);
    }
  };

  if (isUserLoading || isLinksLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser || !currentUser.name) {
    return (
      <RenderUserForm
        onSave={handleSaveUserName}
        isLoading={isAddingUserName || isUserUpdateLoading}
        onOpenChange={setIsUserDialogOpen}
        isOpen={isUserDialogOpen}
        error={error}
      />
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-white min-w-[280px] md:min-w-[280px]" id="sidebar">
        <div className="p-4">
          <h1 className="text-xl font-bold">LinkTree Admin</h1>
          <h1>{currentUser?.email}</h1>
        </div>
        <nav className="mt-4 flex flex-col">
          <a href="#" className="block py-2 px-4 text-purple-600 bg-purple-100 font-medium">Links</a>
          <a href="#" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">Appearance</a>
          <a href="#" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">Analytics</a>
          <a href="#" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">Settings</a>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        <div className="mb-4 bg-blue-100 p-4 rounded-md">
          <p className="text-blue-800">🔥 Your Linktree is live: <a href={`http://localhost:5174/${currentUser?.name}`} className="underline">{`http://localhost:5174/${currentUser?.name}`}</a></p>
        </div>
        <div className="bg-white rounded-md shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Links</h2>

          <AddLinkButton
            onSave={addLink}
            disabled={isCreateLoading}
            isLoading={isCreateLoading}
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />

          <div className="mt-4">
            {links?.map(link => (
              <div key={link._id} className="bg-gray-50 p-4 rounded-md mb-2 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{link.name}</h3>
                  <p className="text-gray-600">{link.url}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(link)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(link._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="w-80 bg-gray-200 p-4 hidden lg:block">
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg p-4" style={{ aspectRatio: '9/19' }}>
          <div className="flex flex-col items-center">
            <h3 className="mb-1">Preview</h3>
            <img src={Noavater} className="w-24 h-24 rounded-full mb-4" />
            <h2 className="text-xl font-bold">{currentUser?.name}</h2>
            <div className="mt-4 w-full">
              {links?.map(link => (
                <a
                  key={link._id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gray-100 text-center py-2 rounded-md mb-2 hover:bg-gray-200 transition duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Link Dialog */}
      {editLinkData && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50 p-4 rounded-md shadow-lg">
            <LinksForm
              onSave={editLink}
              isLoading={isUpdateLoading}
              title="Edit Link"
              buttonText="Update Link"
              defaultValues={{ name: editLinkData.name, url: editLinkData.url }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default LinksPage;
