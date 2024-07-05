// src/pages/AdminPage.tsx

import  { useState } from 'react';
import { mockUserProfile } from '../mockData';
import AddLinkButton from '../components/AddLinkButtonProps';
import { LinksFormData } from '../forms/LinksForm';

const AdminPage = () => {
     const [profile, setProfile] = useState(mockUserProfile);  const [isLoading, setIsLoading] = useState(false);
     const [isDialogOpen, setIsDialogOpen] = useState(false);
  
     const addLink = (data: LinksFormData) => {
          setIsLoading(true);
          // Simulate saving the link
          setTimeout(() => {
            setProfile(prevProfile => ({
              ...prevProfile,
              links: [...prevProfile.links, { id: Date.now().toString(), title: data.name, url: data.link }]
            }));
            setIsLoading(false);
            setIsDialogOpen(false);  // Close the dialog after adding the link
          }, 1000);
        };
 
   const deleteLink = (id: string) => {
     setProfile(prevProfile => ({
       ...prevProfile,
       links: prevProfile.links.filter(link => link.id !== id)
     }));
   };

  
  return (

    
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}

      <div className=" bg-white min-w-[280px] md:min-w-[280px]" id="sidebar">
        <div className="p-4">
          <h1 className="text-xl font-bold">LinkTree Admin</h1>
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
          <p className="text-blue-800">🔥 Your Linktree is live: <a href={`https://linktr.ee/${profile.username}`} className="underline">{`linktr.ee/${profile.username}`}</a></p>
        </div>
        <div className="bg-white rounded-md shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Links</h2>

          <AddLinkButton
            onSave={addLink}
            disabled={isLoading}
            isLoading={isLoading}
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />


          <div className="mt-4">
            {profile.links.map(link => (
              <div key={link.id} className="bg-gray-50 p-4 rounded-md mb-2 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{link.title}</h3>
                  <p className="text-gray-600">{link.url}</p>
                </div>
                <button
                  onClick={() => deleteLink(link.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="w-80 bg-gray-200 p-4 hidden lg:block">
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg p-4" style={{ aspectRatio: '9/19' }}>
          <div className="flex flex-col items-center">
            <img src={profile.avatar} alt={profile.displayName} className="w-24 h-24 rounded-full mb-4" />
            <h2 className="text-xl font-bold">{profile.displayName}</h2>
            <div className="mt-4 w-full">
              {profile.links.map(link => (
                <a
                  key={link.id}
                  href={"#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gray-100 text-center py-2 rounded-md mb-2 hover:bg-gray-200 transition duration-200"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
