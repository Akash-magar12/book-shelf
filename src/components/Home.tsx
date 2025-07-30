import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const response = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
    });
  }, []);
  return <div>Home</div>;
};

export default Home;
