import AppShell from "@/components/app-shell";
import {
  Activity,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

const statistics = [
  {
    label: "Total Deployments",
    value: "1",
    icon: Activity,
  },
  {
    label: "Successful",
    value: "1",
    icon: CheckCircle2,
  },
  {
    label: "Building",
    value: "0",
    icon: Clock3,
  },
  {
    label: "Failed",
    value: "0",
    icon: XCircle,
  },
];

export default function Analytics() {
  return (
    <AppShell title="Analytics">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Analytics
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Monitor deployment activity across your workspace.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {statistics.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="card p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {label}
                </p>

                <Icon
                  size={18}
                  className="text-gray-500"
                />
              </div>

              <p className="text-3xl font-semibold mt-4">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="card mt-6 p-6">
          <h2 className="text-sm font-medium">
            Deployment activity
          </h2>

          <div className="h-56 flex items-center justify-center text-sm text-gray-500">
            Deployment analytics will appear here as your projects
            receive more deployments.
          </div>
        </div>
      </div>
    </AppShell>
  );
}