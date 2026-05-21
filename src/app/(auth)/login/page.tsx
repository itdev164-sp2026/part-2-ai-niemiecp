"use client";

import { useState } from "react";
import { useActionState } from "react";
import Link from "next/link";
import { signIn, signUp } from "@/app/auth-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

type Mode = "signin" | "signup";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const [signInState, signInAction, isSignInPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
      const result = await signIn(data);
      if (!result.success) {
        toast.error(result.error);
      }
      return result;
    },
    { success: false, error: "" }
  );

  const [signUpState, signUpAction, isSignUpPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
      const result = await signUp(data);
      if (!result.success) {
        toast.error(result.error);
      } else {
        toast.success(result.message);
        // Reset form after successful signup
        const form = document.querySelector("form") as HTMLFormElement;
        form?.reset();
      }
      return result;
    },
    { success: false, error: "" }
  );

  const isLoading = isSignInPending || isSignUpPending;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </CardTitle>
          <CardDescription>
            {mode === "signin"
              ? "Enter your credentials to access your account"
              : "Create a new account to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tab-like toggle */}
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
            <button
              onClick={() => setMode("signin")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                mode === "signin"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                mode === "signup"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          <Separator />

          {/* Sign In Form */}
          {mode === "signin" && (
            <form action={signInAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          )}

          {/* Sign Up Form */}
          {mode === "signup" && (
            <form action={signUpAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                <p className="text-xs text-muted-foreground">
                  • At least 8 characters
                  <br />
                  • One uppercase letter
                  <br />
                  • One number
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          )}

          <div className="text-xs text-muted-foreground">
            {mode === "signin" && (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="font-medium text-foreground hover:underline"
                >
                  Sign up
                </button>
              </>
            )}
            {mode === "signup" && (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("signin")}
                  className="font-medium text-foreground hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
