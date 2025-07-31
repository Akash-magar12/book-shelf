import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import BookDetails from "./components/BookDetails";
import MainLayout from "./Pages/MainLayout";
import LandingPage from "./Pages/LandinPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // This wraps all child routes with Navbar & Footer
    children: [
      {
        index: true,
        element: <LandingPage />, // Home page
      },
      {
        path: "book-details/:id",
        element: <BookDetails />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
