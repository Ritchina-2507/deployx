import Link from "next/link";
import {
  ExternalLink,
  GitBranch,
  Settings2,
} from "lucide-react";
import AppShell from "@/components/app-shell";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import DeployButton from "@/components/deploy-button";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const project = await db.project.findFirst({
    where: {
      name,
      userId: user.id,
    },
    include: {
      deployments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  const latestDeployment = project.deployments[0];

  const productionUrl =
    project.productionUrl ||
    latestDeployment?.deploymentUrl ||
    `https://${project.name}.deployx.app`;

  return (
    <AppShell title={project.name}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-black text-white flex items-center justify-center text-sm">
                ▲
              </div>

              <h1 className="text-2xl font-semibold tracking-tight">
                {project.name}
              </h1>
            </div>

            <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
              <span className="flex gap-1 items-center">
                <GitBranch size={13} />
                {latestDeployment?.branch || "main"}
              </span>

              <span>·</span>

              <span>{project.framework}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href={productionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border px-3 py-2 rounded-md text-sm flex items-center gap-2"
            >
              <ExternalLink size={15} />
              Visit
            </a>

            <button className="border px-3 py-2 rounded-md text-sm flex items-center gap-2">
              <Settings2 size={15} />
              Settings
            </button>
          </div>
        </div>

        {/* Main cards */}
        <div className="grid lg:grid-cols-3 gap-4 mt-8">
          <div className="card p-5 lg:col-span-2">
            <p className="text-sm font-medium">
              Production
            </p>

            <div className="mt-5 rounded-lg border bg-[#fafafa] h-56 flex items-center justify-center text-sm text-gray-400">
              Deployment preview
            </div>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">
                  Latest deployment
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {latestDeployment
                    ? `${latestDeployment.branch} · ${latestDeployment.environment}`
                    : "No deployments yet"}
                </p>
              </div>

              {latestDeployment && (
                <span
                  className={`text-xs ${
                    latestDeployment.status === "ready"
                      ? "text-green-600"
                      : latestDeployment.status === "failed"
                        ? "text-red-600"
                        : "text-amber-600"
                  }`}
                >
                  ●{" "}
                  {latestDeployment.status
                    .charAt(0)
                    .toUpperCase() +
                    latestDeployment.status.slice(1)}
                </span>
              )}
            </div>
          </div>

          {/* Domain */}
          <div className="card p-5">
            <p className="font-medium text-sm">
              Domains
            </p>

            <div className="mt-5 p-3 border rounded-md text-sm break-all">
              {productionUrl.replace(/^https?:\/\//, "")}
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Production domain
            </p>
          </div>
        </div>

        {/* Deploy action */}
        <div className="card mt-6 p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-sm">
                Deploy project
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Deploy the latest version from the main branch.
              </p>
            </div>

            <DeployButton projectId={project.id} />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-5 border-b text-sm">
          <Link
            href={`/projects/${name}`}
            className="border-b-2 border-black pb-3"
          >
            Deployments
          </Link>

          <Link
            href={`/projects/${name}?tab=analytics`}
            className="text-gray-500 pb-3"
          >
            Analytics
          </Link>

          <Link
            href={`/projects/${name}?tab=logs`}
            className="text-gray-500 pb-3"
          >
            Logs
          </Link>

          <Link
            href={`/projects/${name}?tab=settings`}
            className="text-gray-500 pb-3"
          >
            Settings
          </Link>
        </div>

        {/* Deployment history */}
        <div className="card mt-6 divide-y">
          {project.deployments.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              No deployments yet.
            </div>
          ) : (
            project.deployments.map((deployment) => (
              <div
                key={deployment.id}
                className="p-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    {deployment.environment ===
                    "production"
                      ? "Production deployment"
                      : "Preview deployment"}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {deployment.branch} ·{" "}
                    {deployment.commitSha
                      ? deployment.commitSha.slice(0, 7)
                      : "No commit"}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {deployment.deploymentUrl && (
                    <a
                      href={deployment.deploymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-black"
                    >
                      View
                    </a>
                  )}

                  <span
                    className={`text-xs ${
                      deployment.status === "ready"
                        ? "text-green-600"
                        : deployment.status === "failed"
                          ? "text-red-600"
                          : "text-amber-600"
                    }`}
                  >
                    {deployment.status
                      .charAt(0)
                      .toUpperCase() +
                      deployment.status.slice(1)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
