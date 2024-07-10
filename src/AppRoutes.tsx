import './index.css';
import './pages/ProfilePage';
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from './pages/ProfilePage';
import Layout from './layouts/layout';
import AdminPage from './pages/adminPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import LandingPage from './pages/HomePage';
import ProtectedRoute from './auth/ProtectedRoute';
import LinksPage from './pages/LinksPage';
import UserLinksPage from './pages/UserLinksPage';
import SettingsPage from './pages/settingPage';

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
          path="/setting"
          element={<SettingsPage />}
        />
        <Route
          path="/dashboard"
          element={<LinksPage />}
        />
      </Route>
      <Route
        path="/user/:username"
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
