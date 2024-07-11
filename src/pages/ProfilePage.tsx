// // src/pages/HomePage.tsx

// import { Link } from "react-router-dom";
// import { mockUserProfile } from "../mockData";
// import { useParams } from "react-router-dom";
// import { useGetLinksByUsername } from "../api/LinksApi";
// import { useEffect } from "react";
// import { toast } from "sonner";

// const ProfilePage = () => {
//   const profile = mockUserProfile;

//   return (
//     <div className="flex flex-col items-center p-4">

//       <img
//         className="mb-4 w-24 h-24 rounded-full"
//         src={profile.avatar}
//         alt="profileImg"
//       />

//       <Link to="/admin">
//         <h1 className="text-paragraphColor-white text-2xl font-semibold hover:bg-purpleTheme-light">
//           @{profile.username}
//         </h1>
//       </Link>

//       <p className="text-paragraphColor-white text-center">{profile.bio}</p>


//       <div className="w-full max-w-md mt-4">
//         {profile.links.map((link) => (
//           <a
//             key={link._id}
//             href={link.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block px-4 py-2 my-2 text-center text-white bg-blue-500 rounded hover:bg-blue-700"
//           >
               
//             {link.title}
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
