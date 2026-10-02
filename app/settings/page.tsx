import AppShell from "@/components/app-shell";
import { User, Shield } from "lucide-react";

export default function Settings() {
  return (
    <AppShell title="Settings">
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Settings
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage your DeployX account and workspace settings.
        </p>

        <div className="card mt-8">
          <div className="px-5 py-4 border-b flex items-center gap-3">
            <User size={18} />

            <div>
              <h2 className="text-sm font-medium">
                Profile
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Your account information
              </p>
            </div>
          </div>

          <div className="p-5 space-y-5">
            <div>
              <label className="text-sm font-medium">
                Name
              </label>

              <input
                type="text"
                value="Rita"
                readOnly
                className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                value="demo@deployx.dev"
                readOnly
                className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="card mt-6">
          <div className="px-5 py-4 border-b flex items-center gap-3">
            <Shield size={18} />

            <div>
              <h2 className="text-sm font-medium">
                Security
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Manage account security
              </p>
            </div>
          </div>

          <div className="p-5">
            <button className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50">
              Change password
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}