import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./Pages/Login";
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
      path: "/",
      element: <Signup />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
