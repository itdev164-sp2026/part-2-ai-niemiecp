"use server"

import { redirect } from "next/navigation";
import { createServerActionClient } from "@/lib/supabase/server-action";
import { authSchema, type AuthInput } from "@/lib/schemas";

export async function signIn(data: unknown) {
  // Validate the data server-side using the Zod schema
  const validation = authSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Validation failed",
    };
  }

  const supabase = await createServerActionClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: validation.data.email,
    password: validation.data.password,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  redirect("/projects");
}

export async function signUp(data: unknown) {
  // Validate the data server-side using the Zod schema
  const validation = authSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Validation failed",
    };
  }

  const supabase = await createServerActionClient();

  const { error } = await supabase.auth.signUp({
    email: validation.data.email,
    password: validation.data.password,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    message: "Sign up successful. Check your email to confirm your account.",
  };
}

export async function signOut() {
  const supabase = await createServerActionClient();

  await supabase.auth.signOut();

  redirect("/login");
}
