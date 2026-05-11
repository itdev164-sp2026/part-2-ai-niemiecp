"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
  FieldContent,
} from "@/components/ui/field"
import { projectSchema, type Project } from "@/lib/schemas"
import { createProject } from "@/app/actions"

export function ProjectForm() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Project>({
    resolver: zodResolver(projectSchema),
  })

  const statusValue = watch("status")

  const onSubmit = async (data: Project) => {
    setIsLoading(true)
    try {
      const result = await createProject(data)
      if (result.success) {
        toast.success("Project created successfully!")
        // Optionally reset form or redirect
      } else {
        toast.error(result.error || "Failed to create project")
      }
    } catch (error) {
      toast.error("An error occurred while creating the project")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          {/* Title Field */}
          <Field>
            <FieldLabel htmlFor="title">Project Title</FieldLabel>
            <FieldContent>
              <Input
                id="title"
                placeholder="Enter project title"
                aria-invalid={!!errors.title}
                {...register("title")}
              />
              {errors.title && (
                <FieldError errors={[errors.title]} />
              )}
            </FieldContent>
          </Field>

          {/* Description Field */}
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <FieldContent>
              <Textarea
                id="description"
                placeholder="Enter project description"
                aria-invalid={!!errors.description}
                {...register("description")}
              />
              {errors.description && (
                <FieldError errors={[errors.description]} />
              )}
            </FieldContent>
          </Field>

          {/* Status Field */}
          <Field>
            <FieldLabel htmlFor="status">Status</FieldLabel>
            <FieldContent>
              <Select value={statusValue} onValueChange={(value) => setValue("status", value as any)}>
                <SelectTrigger
                  id="status"
                  aria-invalid={!!errors.status}
                >
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <FieldError errors={[errors.status]} />
              )}
            </FieldContent>
          </Field>
        </FieldGroup>

        {/* Submit Button */}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Creating..." : "Create Project"}
        </Button>
      </FieldSet>
    </form>
  )
}
