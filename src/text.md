import { auth, db } from "@/firebase/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

interface AppUser {
  name: string;
  email: string;
  photoURL: string;
}

const Home = () => {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          const userRef = doc(db, "users", firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUser(userSnap.data() as AppUser);
          } else {
            console.log("No such document!");
          }
        } else {
          setUser(null);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Navbar />
      {user ? (
        <div>
          {user?.photoURL && <img src={user?.photoURL} alt={user?.name} />}
          <h1>{user?.name}</h1>
          <h1>{user?.email}</h1>
        </div>
      ) : (
        <p>Loding...</p>
      )}
    </div>
  );
};

export default Home;
