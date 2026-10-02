import AppShell from "@/components/app-shell";
import { Globe2, ExternalLink } from "lucide-react";

export default function Domains() {
  return (
    <AppShell title="Domains">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Domains
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage domains connected to your DeployX projects.
        </p>

        <div className="card mt-8">
          <div className="px-5 py-4 border-b">
            <h2 className="text-sm font-medium">
              Project domains
            </h2>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center">
                  <Globe2 size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    portfolio.deployx.app
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    portfolio · Production
                  </p>
                </div>
              </div>

              <a
                href="https://portfolio.deployx.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-black"
              >
                <ExternalLink size={17} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}