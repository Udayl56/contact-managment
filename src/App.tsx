


import { Outlet, NavLink, useLocation } from "react-router-dom";
import './index.css';



export function App() {

  // Hook to get the current location (pathname)
  const location = useLocation();

  // Function to get the title based on the current pathname
  const getTitle = (): string => {
    switch (location.pathname) {
      case '/':
        return 'Contact';
      case '/chart-map':
        return 'Chart and Maps';
      default:
        return 'Contact';
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header section */}
      <div className="flex p-2 bg-sky-300">
        <div className="flex-grow">
          <h1 className="font-bold text-2xl text-white sm:text-center">
            {getTitle()}
          </h1>
        </div>
        {/* Navigation for small screens */}
        <div className="block sm:hidden flex">
          <ul className="list-none flex">
            <li className=" p-1 link-active">
              <NavLink to="/" className='p-2'>Contact</NavLink>
            </li>
            <li className=" p-1 link-active">
              <NavLink to="/chart-map">Chart and Maps</NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content section */}
      <aside className="flex-grow flex">
        {/* Navigation for larger screens */}
        <div className="border-e hidden sm:block">
          <div className="border-b p-4 link-active">
            <NavLink to="/" className='p-2'>Contact</NavLink>
          </div>
          <div className="border-b p-4 link-active">
            <NavLink to="/chart-map">Chart and Maps</NavLink>
          </div>
        </div>

        {/* Content area where matched route component will be rendered */}
        <div className="w-full sm:w-4/5">
          <Outlet />
        </div>
      </aside>
    </div>
  );
}
