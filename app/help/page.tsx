import AppShell from "@/components/app-shell";
import { CircleHelp, BookOpen, MessageCircle } from "lucide-react";

const helpItems = [
  {
    title: "Getting started",
    description:
      "Learn how to create a project and deploy your application with DeployX.",
    icon: BookOpen,
  },
  {
    title: "Documentation",
    description:
      "Explore deployment, projects, domains, and environment settings.",
    icon: CircleHelp,
  },
  {
    title: "Support",
    description:
      "Get assistance when something is not working as expected.",
    icon: MessageCircle,
  },
];

export default function Help() {
  return (
    <AppShell title="Help">
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Help
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Find information and resources to help you use DeployX.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {helpItems.map(
            ({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="card p-5 hover:border-gray-300 transition"
              >
                <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center">
                  <Icon size={18} />
                </div>

                <h2 className="font-medium mt-4">
                  {title}
                </h2>

                <p className="text-sm text-gray-500 mt-2 leading-6">
                  {description}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </AppShell>
  );
}