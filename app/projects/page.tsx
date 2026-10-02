"use client";

import Link from "next/link";
import AppShell from "@/components/app-shell";
import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  framework: string;
  productionUrl: string | null;
  status: string;
  _count: {
    deployments: number;
  };
};

function getStatusClass(status: string) {
  switch (status.toLowerCase()) {
    case "ready":
      return "text-green-600";

    case "building":
      return "text-amber-600";

    case "failed":
      return "text-red-600";

    default:
      return "text-gray-500";
  }
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch("/api/projects");

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);

          throw new Error(
            errorData?.error || "Failed to load projects."
          );
        }

        const data = await response.json();

        setProjects(data);
      } catch (error) {
        console.error("Project loading error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load projects."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <AppShell title="Projects">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Projects
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Your deployed applications.
            </p>
          </div>

          <Link
            href="/new"
            className="bg-black text-white px-4 py-2 rounded-md text-sm"
          >
            Add New
          </Link>
        </div>

        <div className="card mt-8 divide-y">
          {loading && (
            <div className="p-8 text-center text-sm text-gray-500">
              Loading projects...
            </div>
          )}

          {!loading && error && (
            <div className="p-8 text-center text-sm text-red-500">
              {error}
            </div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="p-8 text-center text-sm text-gray-500">
              No projects yet.
            </div>
          )}

          {!loading &&
            !error &&
            projects.map((project) => (
              <Link
                href={`/projects/${project.name}`}
                key={project.id}
                className="p-5 flex items-center justify-between hover:bg-[#fafafa]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-black text-white flex items-center justify-center text-xs">
                    ▲
                  </div>

                  <div>
                    <div className="font-medium">
                      {project.name}
                    </div>

                    <div className="text-xs text-gray-500 mt-1">
                      {project.framework} ·{" "}
                      {project._count.deployments}{" "}
                      {project._count.deployments === 1
                        ? "deployment"
                        : "deployments"}
                    </div>
                  </div>
                </div>

                <span
                  className={`text-xs ${getStatusClass(
                    project.status
                  )}`}
                >
                  ●{" "}
                  {project.status.charAt(0).toUpperCase() +
                    project.status.slice(1)}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </AppShell>
  );
}