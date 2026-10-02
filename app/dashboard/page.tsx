import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock3, GitBranch, Plus } from "lucide-react";
import AppShell from "@/components/app-shell";

const projects = [
  { name: "portfolio", framework: "Next.js", status: "Ready", branch: "main", updated: "12 min ago" },
  { name: "hr-chatbot", framework: "Python", status: "Ready", branch: "main", updated: "2 hours ago" },
  { name: "ecommerce-app", framework: "Next.js", status: "Building", branch: "dev", updated: "5 min ago" }
];

export default function Dashboard() {
  return (
    <AppShell title="Overview">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Personal workspace</p>
            <h1 className="text-2xl font-semibold tracking-tight mt-1">Overview</h1>
          </div>
          <Link href="/new" className="hidden sm:flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm">
            <Plus size={16}/> New Project
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Stat label="Projects" value="3" />
          <Stat label="Deployments this month" value="18" />
          <Stat label="Success rate" value="94%" />
        </div>

        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Projects</h2>
            <Link href="/projects" className="text-sm text-gray-500 hover:text-black">View all</Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Link href={`/projects/${project.name}`} key={project.name} className="card p-5 hover:border-gray-400 transition">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-black text-white flex items-center justify-center text-xs">▲</div>
                    <div>
                      <h3 className="font-medium">{project.name}</h3>
                      <p className="text-xs text-gray-500">{project.framework}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={17} className="text-gray-400"/>
                </div>
                <div className="mt-7 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1.5"><GitBranch size={13}/>{project.branch}</span>
                  <span className={`flex items-center gap-1.5 ${project.status === "Ready" ? "text-green-600" : "text-amber-600"}`}>
                    {project.status === "Ready" ? <CheckCircle2 size={14}/> : <Clock3 size={14}/>}
                    {project.status}
                  </span>
                </div>
                <p className="mt-3 text-xs text-gray-400">Updated {project.updated}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-medium mb-4">Recent deployments</h2>
          <div className="card divide-y">
            {projects.map((p, i) => (
              <div key={p.name} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium">{p.name} <span className="text-gray-400">/</span> {p.branch}</div>
                  <div className="text-xs text-gray-500 mt-1">{i === 0 ? "feat: update portfolio" : "chore: update dependencies"}</div>
                </div>
                <div className="flex items-center gap-5 text-xs">
                  <span className="text-gray-400">{p.updated}</span>
                  <span className={p.status === "Ready" ? "text-green-600" : "text-amber-600"}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="card p-5"><p className="text-sm text-gray-500">{label}</p><p className="text-2xl font-semibold mt-2">{value}</p></div>;
}