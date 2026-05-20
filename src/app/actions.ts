"use server"

import { createServerActionClient } from "@/lib/supabase/server-action"
import { projectSchema, type Project } from "@/lib/schemas"

export async function createProject(data: unknown) {
  // Validate the data server-side using the Zod schema
  const validation = projectSchema.safeParse(data)

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Validation failed",
    }
  }

  // Get the authenticated Supabase client
  const supabase = await createServerActionClient()

  // Insert into Supabase (RLS will automatically filter by authenticated user)
  const { data: result, error } = await supabase
    .from("projects")
    .insert([validation.data])
    .select()

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
    data: result,
  }
}
