import './pages/ProfilePage';
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from './layouts/layout';
import AuthCallbackPage from './pages/AuthCallbackPage';
import LandingPage from './pages/HomePage';
import ProtectedRoute from './auth/ProtectedRoute';
import LinksPage from './pages/DashboardPage';
import UserLinksPage from './pages/UserLinksPage';
import SettingsPage from './pages/settingPage';

const AppRoutes = () => {
  return (
    <Routes>
      
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
