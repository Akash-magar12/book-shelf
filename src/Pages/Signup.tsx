// UI components from your custom UI library
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Firestore timestamp and document tools
import { FieldValue, getDoc, serverTimestamp } from "firebase/firestore";

// Firebase app setup (auth & firestore instances)
import { auth, db } from "@/firebase/firebase";

// Firebase Auth functions
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

// React and routing tools
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icons
import { Eye, EyeOff } from "lucide-react";

// Google auth provider
import { provider } from "../firebase/firebase";

// Firestore document manipulation
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

// ---------- Type Definitions ----------

// For manual sign-up (email/password)
type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

// For email/password users stored in Firestore
interface FirestoreUser {
  uid: string;
  name: string;
  email: string;
  createdAt: FieldValue;
}

// For Google users stored in Firestore
interface GoogleFirestoreUser {
  uid: string;
  name: string;
  email: string;
  createdAt: FieldValue;
  photoURL: string;
}

// ---------- Component ----------

const Signup = () => {
  // Form state
  const [form, setForm] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
  });

  // Toggle password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Show loading state on form submission
  const [loading, setLoading] = useState<boolean>(false);

  // React Router navigation
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ---------- Handle Manual Signup ----------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;

      // 2. Set display name in Firebase Auth profile
      await updateProfile(user, {
        displayName: form.name,
      });

      // 3. Save user info in Firestore
      const userData: FirestoreUser = {
        uid: user.uid,
        name: form.name,
        email: form.email,
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, "users", user.uid), userData);

      // 4. Clear form and redirect
      setForm({ name: "", email: "", password: "" });
      toast.success("Signup successfull");

      navigate("/home");
      console.log(user);
    } catch (error) {
      console.log(error); // TODO: Show user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  // ---------- Handle Google Signin ----------
  const handleGoogle = async () => {
    try {
      // 1. Show Google popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 2. Reference the user document
      const userRef = doc(db, "users", user.uid);

      // 3. Check if user already exists
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // 4. If not, store user info
        const userData: GoogleFirestoreUser = {
          uid: user.uid ?? "",
          name: user.displayName ?? "",
          email: user.email ?? "",
          photoURL: user.photoURL ?? "",
          createdAt: serverTimestamp(),
        };

        await setDoc(userRef, userData);
        toast.success("Signup successfull");

        navigate("/");
      } else {
        toast.error("This email is already used with another login method.");
      }
    } catch (error) {
      console.log(error); // TODO: Handle error (like email exists with different method)
    }
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">
            Signup to your account
          </CardTitle>
          <CardDescription>
            Enter your credentials below to access your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                id="name"
                type="text"
                value={form.name}
                placeholder="Enter your name"
                required
                className="mt-2"
                onChange={handleChange}
              />
            </div>

            {/* Email Field */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                value={form.email}
                type="email"
                placeholder="Enter your email"
                required
                className="mt-2"
                onChange={handleChange}
              />
            </div>

            {/* Password Field with Toggle */}
            <div className="relative">
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="password">Password</Label>
                <span className="text-sm text-blue-500 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>

              <Input
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                className="pr-10"
                placeholder="******"
                onChange={handleChange}
              />

              {/* Toggle Eye Icon */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500 dark:text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {/* Submit Button */}
            <Button disabled={loading} type="submit" className="w-full">
              {loading ? "Signing up..." : "Sign Up"}
            </Button>

            {/* Google Sign In */}
            <Button
              onClick={handleGoogle}
              variant="outline"
              className="h-11 border-gray-200 w-full dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Google
            </Button>
          </form>
        </CardContent>

        {/* Footer with Link to Login */}
        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
