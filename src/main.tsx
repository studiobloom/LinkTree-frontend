import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from "sonner";
 import "./index.css"
import AppRoutes from './AppRoutes.tsx';
import { BrowserRouter as Router } from 'react-router-dom';import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate.tsx';
import { QueryClient, QueryClientProvider } from "react-query";

// instance of the QueryClient with custom option and it is set to false which 
// menas that queries will not automatically reftch 
// to make it easy to make request to the backend
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});


//Rendering the Application

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
       
       
       <Auth0ProviderWithNavigate>
        <AppRoutes />
        {/* This component displays toast notifications. The visibleToasts prop limits the number of visible toasts to 1, and position specifies the toast's position on the screen. */}
          <Toaster visibleToasts={1} position="top-right" richColors />
          </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
