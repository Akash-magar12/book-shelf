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
import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
type SignupFormData = {
  name: string;
  email: string;
  password: string;
};
const Signup = () => {
  const [form, setForm] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await updateProfile(userCredential.user, {
        displayName: form.name,
      });
      setForm({
        name: "",
        email: "",
        password: "",
      });
      const user = userCredential.user;
      navigate("/home");
      console.log(user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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

            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <span className="text-sm text-blue-500 hover:underline">
                  Forgot password?
                </span>
              </div>
              <Input
                name="password"
                id="password"
                type="password"
                required
                value={form.password}
                className="mt-2"
                onChange={handleChange}
              />
            </div>

            <Button disabled={loading} type="submit" className="w-full">
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
            <Button
              variant="outline"
              className="h-11 border-gray-200 w-full dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Google
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link to="login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
