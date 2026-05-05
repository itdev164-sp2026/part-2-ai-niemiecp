import { SkillsGrid } from "@/components/skills-grid";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">
          Parker Niemiec
        </h1>
        <p className="text-lg text-muted-foreground">
          MATC student pursuing an Associates degree in IT Web and Software Development. Passionate about building modern, responsive web applications with cutting-edge technologies.
        </p>
      </section>

      <SkillsGrid />
    </div>
  );
}
