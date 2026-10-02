"use client";

import AppShell from "@/components/app-shell";
import { useEffect, useState } from "react";

type Deployment = {
  id: string;
  status: string;
  environment: string;
  branch: string;
  deploymentUrl: string | null;
  createdAt: string;
  project: {
    name: string;
  };
};

function getStatusClass(status: string) {
  switch (status.toLowerCase()) {
    case "ready":
    case "success":
      return "text-green-600";

    case "building":
    case "queued":
      return "text-amber-600";

    case "failed":
      return "text-red-600";

    default:
      return "text-gray-500";
  }
}

export default function Deployments() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDeployments() {
      try {
        const response = await fetch("/api/deployments");

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);

          throw new Error(
            errorData?.error || "Failed to load deployments."
          );
        }

        const data = await response.json();

        setDeployments(data);
      } catch (error) {
        console.error("Deployment loading error:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load deployments."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDeployments();
  }, []);

  return (
    <AppShell title="Deployments">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Deployments
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          All deployments across your projects.
        </p>

        <div className="card mt-8 overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-5 px-5 py-3 border-b text-xs text-gray-500">
              <span>Project</span>
              <span>Branch</span>
              <span>Environment</span>
              <span>Status</span>
              <span>Created</span>
            </div>

            {loading && (
              <div className="px-5 py-10 text-center text-sm text-gray-500">
                Loading deployments...
              </div>
            )}

            {!loading && error && (
              <div className="px-5 py-10 text-center text-sm text-red-500">
                {error}
              </div>
            )}

            {!loading && !error && deployments.length === 0 && (
              <div className="px-5 py-10 text-center text-sm text-gray-500">
                No deployments yet.
              </div>
            )}

            {!loading &&
              !error &&
              deployments.map((deployment) => (
                <div
                  key={deployment.id}
                  className="grid grid-cols-5 px-5 py-4 border-b last:border-0 text-sm"
                >
                  <span className="font-medium">
                    {deployment.project.name}
                  </span>

                  <span className="text-gray-600">
                    {deployment.branch}
                  </span>

                  <span className="text-gray-600 capitalize">
                    {deployment.environment}
                  </span>

                  <span
                    className={getStatusClass(deployment.status)}
                  >
                    ●{" "}
                    {deployment.status.charAt(0).toUpperCase() +
                      deployment.status.slice(1)}
                  </span>

                  <span className="text-gray-500">
                    {new Date(deployment.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}