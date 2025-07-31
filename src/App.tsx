import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Hero";
import Login from "./Pages/Login";
import MainLayout from "./Pages/MainLayout";
import Signup from "./Pages/Signup";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/",
      element: <MainLayout />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
