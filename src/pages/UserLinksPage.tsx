// src/pages/UserLinksPage.tsx

import { useParams } from "react-router-dom";
import { useGetLinksByUsername } from "../api/LinksApi";
import { useEffect } from "react";
import { toast } from "sonner";

const UserLinksPage = () => {
  const { username } = useParams<{ username: string }>();
  const { data: links, isLoading, isError, refetch } = useGetLinksByUsername(username!);

  useEffect(() => {
    if (isError) {
      toast.error('Failed to fetch links');
    }
  }, [isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">{username}'s Links</h1>
      <div className="bg-white rounded-md shadow-md p-6 w-full max-w-xl">
        {links?.map(link => (
          <div key={link._id} className="bg-gray-50 p-4 rounded-md mb-2">
            <h3 className="font-medium">{link.name}</h3>
            <a href={link.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
              {link.url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserLinksPage;
