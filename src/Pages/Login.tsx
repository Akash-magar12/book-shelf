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
import { auth, db } from "@/firebase/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { provider } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";

type LoginFormData = {
  email: string;
  password: string;
};
const Login = () => {
  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false); // 👈 toggle state

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      setForm({
        email: "",
        password: "",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const user = userCredential.user;
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      // Step 1: Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Step 2: Check Firestore for user profile
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // Step 3: User exists in Firestore - allow login
        toast.success("Login successful");
        navigate("/");
      } else {
        // Step 4: User not found in Firestore - block access
        toast.error("Account not found. Please sign up first.");

        // Optional: Delete user from Firebase Auth (client-side only works right after login)
        try {
          await user.delete(); // This only works immediately after login
        } catch (deleteError) {
          console.log(deleteError);
        }

        await signOut(auth);
      }
    } catch (error) {
      console.error("Google Sign-In error:", error);
      toast.error("Something went wrong during Google Sign-In");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials below to access your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                value={form.email}
                name="email"
                id="email"
                type="email"
                placeholder="Enter email"
                required
                className="mt-2"
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="password">Password</Label>
                <span className="text-sm text-blue-500 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>

              <Input
                value={form.password}
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                required
                onChange={handleChange}
                className="mt-2 pr-10"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500 dark:text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <Button disabled={loading} type="submit" className="w-full">
              {loading ? "Login..." : "Login"}
            </Button>
            <Button
              onClick={handleGoogle}
              variant="outline"
              className="h-11 border-gray-200 w-full dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Google
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
