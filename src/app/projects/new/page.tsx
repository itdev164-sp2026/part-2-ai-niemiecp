import { ProjectForm } from "@/components/project-form"

export default function NewProjectPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="max-w-3xl space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            New Project
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            Create a new project
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            Fill out the form below to add a new project to your portfolio.
          </p>
        </div>
      </section>

      <section className="max-w-2xl">
        <ProjectForm />
      </section>
    </div>
  )
}
