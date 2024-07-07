import './index.css';
import './pages/ProfilePage';
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from './pages/ProfilePage';
import Layout from './layouts/layout';
import AdminPage from './pages/adminPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import LandingPage from './pages/HomePage';
import ProtectedRoute from './auth/ProtectedRoute';
import Test from './pages/test';
import LinksPage from './pages/LinksPage';
import UserLinksPage from './pages/UserLinksPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/user/profile"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />

      <Route path="/auth-callback" element={<AuthCallbackPage />} />


     

      <Route
        path="/"
        element={
          <Layout>
            <LandingPage />
          </Layout>
        }
      />

      <Route element={<ProtectedRoute />}>

        <Route
          path="/admin"
          element={
            <Layout>
              <AdminPage />
            </Layout>
          }
        />


<Route
          path="/test"
          element={
            <Layout>
              <Test />
            </Layout>
          }
        />


<Route
        path="/dashboard"
        element={
         
            <LinksPage />
          
        }
      />
      </Route>


      <Route
        path="/:username"
        element={
          <Layout>
            <UserLinksPage />
          </Layout>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
