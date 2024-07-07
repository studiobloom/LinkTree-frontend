// src/api/LinkApi.ts
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type CreateLinkRequest = {
  name: string;
  url: string;
};

type Link = {
  _id: string;
  name: string;
  url: string;
};

export type UpdateLinkRequest = {
     linkId: string;
     name: string;
     url: string;
   };

export const useCreateLinks = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createLinkRequest = async (link: CreateLinkRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my-links`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(link),
    });

    if (!response.ok) {
      throw new Error("Failed to create Link");
    }

    return response.json();
  };

  return useMutation(createLinkRequest);
};

export const useGetLinks = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getLinksRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my-links`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get links");
    }

    return response.json();
  };

  return useQuery<Link[]>("links", getLinksRequest);
};

// New function to fetch links by username
export const useGetLinksByUsername = (username: string) => {
  const getLinksByUsernameRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/api/my-links/${username}`);

    if (!response.ok) {
      throw new Error("Failed to get links");
    }

    return response.json();
  };

  return useQuery<Link[]>(["links", username], getLinksByUsernameRequest);
};



export const useUpdateLinks = () => {
     const { getAccessTokenSilently } = useAuth0();
   
     const updateLinkRequest = async (link: UpdateLinkRequest) => {
       const accessToken = await getAccessTokenSilently();
       const response = await fetch(`${API_BASE_URL}/api/my-links`, {
         method: "PUT",
         headers: {
           Authorization: `Bearer ${accessToken}`,
           "Content-Type": "application/json",
         },
         body: JSON.stringify(link),
       });
   
       if (!response.ok) {
         throw new Error("Failed to update Link");
       }
   
       return response.json();
     };
   
     return useMutation(updateLinkRequest);
   };


   export const useDeleteLink = () => {
     const { getAccessTokenSilently } = useAuth0();
   
     const deleteLinkRequest = async (linkId: string) => {
       const accessToken = await getAccessTokenSilently();
       const response = await fetch(`${API_BASE_URL}/api/my-links/${linkId}`, {
         method: "DELETE",
         headers: {
           Authorization: `Bearer ${accessToken}`,
         },
       });
   
       if (!response.ok) {
         throw new Error("Failed to delete link");
       }
   
       return response.json();
     };
   
     return useMutation(deleteLinkRequest);
   };