// App.jsx or App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import BookDetails from "./components/BookDetails";
import MainLayout from "./Pages/MainLayout";
import LandingPage from "./Pages/LandinPage";
import AddToCart from "./components/AddToCart";
import { Toaster } from "react-hot-toast";
import Explore from "./Pages/Explore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Main layout with Navbar/Footer
    children: [
      {
        index: true,
        element: <LandingPage />, // Homepage
      },
      {
        path: "book-details/:id",
        element: <BookDetails />,
      },
      { path: "cart", element: <AddToCart /> },
      { path: "explore", element: <Explore /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster reverseOrder={false} />
    </>
  );
};

export default App;
