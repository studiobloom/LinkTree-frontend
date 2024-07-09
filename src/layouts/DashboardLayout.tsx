// // src/layouts/DashboardLayout.tsx

// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
// import { useGetMyUser } from '../api/UserApi';

// const DashboardLayout = () => {
//   const { currentUser, isLoading: isUserLoading } = useGetMyUser();

//   if (isUserLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
//       <Sidebar email={currentUser?.email} />
//       <div className="flex-1 p-10">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
