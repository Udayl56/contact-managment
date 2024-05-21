// main.tsx 

import React from 'react'
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom"; // react-router-dom component for routing 
import { router } from './router';
import { QueryClient, QueryClientProvider } from 'react-query'; // For fetching APIs
import { store } from "./contact-store/store.tsx"; // Redux contact store
import { Provider } from 'react-redux'; // For state management
import 'leaflet/dist/leaflet.css';  // Leaflet CSS for maps


// Create a QueryClient instance for managing server state
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>

)
