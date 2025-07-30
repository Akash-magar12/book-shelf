import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Hero";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import MainLayout from "./Pages/MainLayout";

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
      path: "/",
      element: <MainLayout />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
