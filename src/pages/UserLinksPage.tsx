// src/pages/UserLinksPage.tsx

import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetLinksByUsername } from "../api/LinksApi";
import { useEffect } from "react";
import { toast } from "sonner";
import {useGetMyUser} from "../api/UserApi"


import LoadingIcons from 'react-loading-icons'
import { noavater } from "../types";


const UserLinksPage = () => {
     const navigate = useNavigate();

     const {currentUser} = useGetMyUser()
     console.log(currentUser?.name)
     const { username } = useParams<{ username: string }>();
     const { data: links, isLoading, isError, refetch } = useGetLinksByUsername(username!);
   
     useEffect(() => {
       if (isError) {
         toast.error('Failed to fetch links');
         navigate("/")

       }
     }, [isError]);
   
     if (isLoading) {
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
        src={currentUser?.avater || noavater}
        alt="profileImg"
      />

<h1 className="text-paragraphColor-white text-2xl font-semibold hover:bg-purpleTheme-light">
          @{currentUser?.name}
        </h1>

        <p className="text-paragraphColor-white text-center">Welcome to my EchoLink clone

</p>


<div className="w-full max-w-md mt-3">
        {links?.map(link => (
          <div key={link._id} >
            {/* <h3 className="font-medium">{link.name}</h3> */}
            <a href={link.url} className="block px-4 py-2 my-2 text-center text-white bg-blue-500 rounded hover:bg-blue-700" target="_blank" rel="noopener noreferrer"
            
            >
              {link.name}
            </a>
          </div>
        ))}
      </div>

      <div className="tw-full text-center mt-4 py-2 bg-rounded text-purpleTheme-light">
        Join {username} on EchoLink today
      </div>
      
    </div>
    
  );
};
                    

export default UserLinksPage;
