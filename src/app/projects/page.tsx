import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

type Project = {
  id: string | number
  title: string
  description: string
  status: "active" | "completed" | "archived" | string
}

function getStatusClasses(status: string) {
  switch (status) {
    case "active":
      return "bg-emerald-100 text-emerald-700"
    case "completed":
      return "bg-sky-100 text-sky-700"
    case "archived":
      return "bg-slate-100 text-slate-700"
    default:
      return "bg-slate-100 text-slate-700"
  }
}

async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("id,title,description,status")

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="max-w-3xl space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Projects
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            Active work and completed engagements
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            Browse your project portfolio in a clean dashboard layout. Each card highlights the project scope and current status.
          </p>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <CardTitle>{project.title}</CardTitle>
              </div>
              <span
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em]",
                  getStatusClasses(project.status)
                )}
              >
                {project.status}
              </span>
            </CardHeader>
            <CardContent>
              <CardDescription>{project.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
