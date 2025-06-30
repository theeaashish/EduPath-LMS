"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [githubPending, startGithubTransition] = useTransition();

  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Singned in with GitHub, you will be redirected...");
          },
          onError: (error) => {
            toast.error("Internal Server Error");
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-center">Welcome back!</CardTitle>
        <CardDescription className="text-center">
          Login with your GitHub Email Account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button
          onClick={signInWithGithub}
          disabled={githubPending}
          className="w-full cursor-pointer"
          variant="outline"
        >
          {githubPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              SignIn with GitHub
            </>
          )}
        </Button>

        <div
          className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2
            after:z-0 after:flex after:items-center after:border-t after:border-border"
        >
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="email@example.com" />
          </div>
          <Button>Continue with Email</Button>
        </div>
      </CardContent>
    </Card>
  );
}
