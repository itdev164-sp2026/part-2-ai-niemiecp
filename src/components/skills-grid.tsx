import {
  Code,
  Cpu,
  Figma,
  Rocket,
  Zap,
  Globe,
} from "lucide-react";

interface Skill {
  name: string;
  description: string;
  icon: React.ReactNode;
}

const skills: Skill[] = [
  {
    name: "TypeScript",
    description: "Type-safe JavaScript development",
    icon: <Code className="h-8 w-8" />,
  },
  {
    name: "React",
    description: "Building modern UI components",
    icon: <Cpu className="h-8 w-8" />,
  },
  {
    name: "Next.js",
    description: "Full-stack web applications",
    icon: <Rocket className="h-8 w-8" />,
  },
  {
    name: "Tailwind CSS",
    description: "Responsive design & styling",
    icon: <Figma className="h-8 w-8" />,
  },
  {
    name: "JavaScript",
    description: "Core programming language",
    icon: <Zap className="h-8 w-8" />,
  },
  {
    name: "Web Development",
    description: "Full-stack development practices",
    icon: <Globe className="h-8 w-8" />,
  },
];

export function SkillsGrid() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
          >
            <div className="mb-3 text-primary">{skill.icon}</div>
            <h3 className="font-semibold">{skill.name}</h3>
            <p className="text-sm text-muted-foreground">{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}