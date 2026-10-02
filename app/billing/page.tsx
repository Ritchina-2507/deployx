import AppShell from "@/components/app-shell";
import { CreditCard, Check } from "lucide-react";

export default function Billing() {
  return (
    <AppShell title="Billing">
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Billing
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage your DeployX plan and billing information.
        </p>

        <div className="card mt-8">
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                <CreditCard size={19} />
              </div>

              <div>
                <p className="font-medium">
                  Personal Plan
                </p>

                <p className="text-sm text-gray-500">
                  Your current DeployX plan
                </p>
              </div>
            </div>

            <div className="mt-6 border rounded-lg p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    Free
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Suitable for personal projects
                  </p>
                </div>

                <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                  Current plan
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Check size={15} />
                  Project deployments
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Check size={15} />
                  Deployment history
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Check size={15} />
                  Project analytics
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}