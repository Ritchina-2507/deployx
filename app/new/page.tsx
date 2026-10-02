"use client";

import { useState } from "react";
import {
  Github,
  Upload,
  GitBranch,
  ArrowRight,
  Loader2,
} from "lucide-react";
import AppShell from "@/components/app-shell";
import { useRouter } from "next/navigation";

export default function NewProject() {
  const router = useRouter();

  const [projectName, setProjectName] = useState("");
  const [repository, setRepository] = useState("");

  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  async function createProject() {
    setError("");

    const name = projectName.trim().toLowerCase();

    if (!name) {
      setError("Please enter a project name.");
      return;
    }

    setCreating(true);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          framework: "Next.js",
          repository: repository.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to create project."
        );
      }

      router.push("/projects");
      router.refresh();
    } catch (error) {
      console.error("Project creation error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to create project."
      );
    } finally {
      setCreating(false);
    }
  }

  return (
    <AppShell title="New Project">
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create a new project
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Import a repository or upload your project.
        </p>

        {/* Project details */}
        <div className="card mt-8 p-6">
          <h2 className="font-medium">
            Project details
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            Give your project a name before deploying.
          </p>

          <div className="mt-5">
            <label
              htmlFor="project-name"
              className="block text-sm font-medium mb-2"
            >
              Project name
            </label>

            <input
              id="project-name"
              type="text"
              value={projectName}
              onChange={(event) =>
                setProjectName(event.target.value)
              }
              placeholder="my-project"
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
            />

            <p className="text-xs text-gray-400 mt-2">
              Use lowercase letters, numbers, and hyphens.
            </p>
          </div>

          <div className="mt-4">
            <label
              htmlFor="repository"
              className="block text-sm font-medium mb-2"
            >
              Repository URL
              <span className="font-normal text-gray-400">
                {" "}
                (optional)
              </span>
            </label>

            <input
              id="repository"
              type="text"
              value={repository}
              onChange={(event) =>
                setRepository(event.target.value)
              }
              placeholder="https://github.com/username/project"
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>

        {/* GitHub import */}
        <div className="card mt-6 p-6">
          <div className="flex items-center gap-3">
            <Github size={20} />

            <div>
              <h2 className="font-medium">
                Import Git Repository
              </h2>

              <p className="text-xs text-gray-500">
                Connect a GitHub repository.
              </p>
            </div>
          </div>

          <div className="mt-5 border rounded-md p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                portfolio
              </p>

              <p className="text-xs text-gray-500 mt-1">
                github.com/rita/portfolio
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setProjectName("portfolio");
                setRepository(
                  "https://github.com/rita/portfolio"
                );
              }}
              className="border px-3 py-1.5 rounded-md text-sm"
            >
              Select
            </button>
          </div>

          <div className="mt-3 border rounded-md p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                hr-chatbot
              </p>

              <p className="text-xs text-gray-500 mt-1">
                github.com/rita/hr-chatbot
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setProjectName("hr-chatbot");
                setRepository(
                  "https://github.com/rita/hr-chatbot"
                );
              }}
              className="border px-3 py-1.5 rounded-md text-sm"
            >
              Select
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 my-6 text-xs text-gray-400">
          <div className="h-px bg-gray-200 flex-1" />

          <span>OR</span>

          <div className="h-px bg-gray-200 flex-1" />
        </div>

        {/* Upload */}
        <div className="card p-8 text-center border-dashed">
          <Upload
            className="mx-auto text-gray-500"
            size={24}
          />

          <h2 className="font-medium mt-3">
            Upload a project
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            Drag and drop your project folder here.
          </p>

          <button
            type="button"
            className="mt-5 border px-4 py-2 rounded-md text-sm"
          >
            Browse files
          </button>
        </div>

        {/* Configuration */}
        <div className="card mt-6 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">
                Project configuration
              </p>

              <p className="text-xs text-gray-500 mt-1">
                main branch · automatic framework detection
              </p>
            </div>

            <GitBranch
              size={18}
              className="text-gray-400"
            />
          </div>

          {error && (
            <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            disabled={creating}
            onClick={createProject}
            className="mt-5 w-full bg-black text-white py-2.5 rounded-md text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {creating ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Creating project...
              </>
            ) : (
              <>
                Create Project
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
