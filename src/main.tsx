import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import AppRoutes from './AppRoutes.tsx'
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate.tsx';

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


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>


    <Router>
    <QueryClientProvider client={queryClient}>
 <Auth0ProviderWithNavigate>


    <AppRoutes />

    </Auth0ProviderWithNavigate>
    </QueryClientProvider>

    </Router>
    
  </React.StrictMode>,
)
