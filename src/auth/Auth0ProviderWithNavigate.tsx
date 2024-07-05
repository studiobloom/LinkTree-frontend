// Importing necessary components and hooks from Auth0 and React Router
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

// Defining the type for the component props
type Props = {
  children: React.ReactNode; // The children prop allows components to pass elements to nested components
};

// Auth0ProviderWithNavigate component
const Auth0ProviderWithNavigate = ({ children }: Props) => {
  // useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Getting Auth0 configuration from environment variables
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  // If any of the configuration values are missing, throw an error
  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("Unable to initialize Auth0");
  }

  // Handles redirection after login, navigating to appState?.returnTo or a default path
  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || "/auth-callback");
  };

  // Rendering Auth0Provider with the necessary configuration and the onRedirectCallback function
  return (
    <Auth0Provider
      domain={domain} // Auth0 domain
      clientId={clientId} // Auth0 client ID
      authorizationParams={{
        redirect_uri: redirectUri, // URL to redirect to after login
        audience, // Auth0 audience
      }}
      onRedirectCallback={onRedirectCallback} // Callback function after redirection
    >
      {children} {/* Render nested children components */}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate; // Exporting the component
