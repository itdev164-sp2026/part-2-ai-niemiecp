"use server"

import { supabase } from "@/lib/supabase"
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

  // Insert into Supabase
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
