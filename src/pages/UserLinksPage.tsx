// src/pages/UserLinksPage.tsx
import {  useNavigate, useParams } from "react-router-dom";
import { useGetLinksByUsername } from "../api/LinksApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useGetUserByUsername } from "../api/UserApi";
import LoadingIcons from 'react-loading-icons'
import { noavater } from "../types";

const UserLinksPage = () => {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  
  const { 
    data: user, 
    isLoading: isUserLoading, 
    isError: isUserError 
  } = useGetUserByUsername(username!);
  
  const { 
    data: links, 
    isLoading: isLinksLoading, 
    isError: isLinksError, 
     
  } = useGetLinksByUsername(username!);

  useEffect(() => {
    if (isLinksError || isUserError) {
      toast.error('Failed to fetch data');
      navigate("/");
    }
  }, [isLinksError, isUserError]);

  if (isUserLoading || isLinksLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <LoadingIcons.Puff stroke="#98ff98" strokeOpacity={.125} height="100" width="100" />
        <span className="text-white mt-2 text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-full">
      <img
        className="mb-4 w-24 h-24 rounded-full"
        src={user?.avater || noavater}
        alt="profileImg"
      />
      <h1 className="text-paragraphColor-white text-2xl font-semibold hover:bg-purpleTheme-light">
        @{user?.name}
      </h1>
      <p className="text-paragraphColor-white text-center">
        {user?.bio || null}
      </p>
      <div className="w-full max-w-md mt-3">
        {links?.map(link => (
          <div key={link._id} >
            <a href={link.url} className="bg-purple-500 hover:bg-purpleTheme-dark2 rounded  transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg   block px-4 py-2 my-2 text-center text-white " target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          </div>
        ))}
      </div>
      <div className="tw-full text-center mt-4 py-2 bg-rounded text-purpleTheme-light">

        <a  href="#">Join {username} on EchoLink today </a>
      </div>
    </div>
  );
};

export default UserLinksPage;