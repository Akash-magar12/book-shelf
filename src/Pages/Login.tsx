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

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials below to access your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-10">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <span className="text-sm text-blue-500 hover:underline">
                  Forgot password?
                </span>
              </div>
              <Input id="password" type="password" required />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground text-center">
            Don’t have an account?{" "}
            <span className="text-blue-500 hover:underline">Sign up</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
