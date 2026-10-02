import AppShell from "@/components/app-shell";
import { Terminal } from "lucide-react";

export default function Logs() {
  return (
    <AppShell title="Logs">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Logs
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          View build and deployment logs from your projects.
        </p>

        <div className="card mt-8 overflow-hidden">
          <div className="px-5 py-4 border-b flex items-center gap-2">
            <Terminal size={17} />

            <h2 className="text-sm font-medium">
              Latest deployment
            </h2>
          </div>

          <div className="bg-black text-gray-200 p-5 font-mono text-sm leading-7 min-h-[280px]">
            <div>
              $ deployx build
            </div>

            <div className="text-gray-400">
              Installing dependencies...
            </div>

            <div className="text-gray-400">
              Building application...
            </div>

            <div className="text-gray-400">
              Optimizing assets...
            </div>

            <div className="text-gray-400">
              Creating deployment...
            </div>

            <div className="text-green-400">
              ✓ Deployment ready
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}