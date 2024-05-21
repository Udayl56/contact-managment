// router.tsx

import { createBrowserRouter } from "react-router-dom"; // For routing
import { App } from './App.tsx';
import { Contact } from './components/Contact.tsx';
import { ChartAndMap } from './line-graph/chart&map.tsx';
import { CreateContact } from './components/createContact.tsx';



// Define the router configuration
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: '/', element: <Contact />, index: true },
            { path: '/create-contact', element: <CreateContact /> },
            { path: '/edit-contact/:id', element: <CreateContact /> },
            { path: '/chart-map', element: <ChartAndMap /> },
        ],
    },
]);
