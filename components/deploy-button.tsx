"use client";

import { useState } from "react";
import { Loader2, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeployButton({
  projectId,
}: {
  projectId: string;
}) {
  const router = useRouter();

  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState("");

  async function deploy() {
    setDeploying(true);
    setError("");

    try {
      const response = await fetch("/api/deployments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          branch: "main",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to start deployment."
        );
      }

      router.refresh();
    } catch (error) {
      console.error("Deployment error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to start deployment."
      );
    } finally {
      setDeploying(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={deploy}
        disabled={deploying}
        className="bg-black text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 disabled:opacity-60"
      >
        {deploying ? (
          <>
            <Loader2
              size={15}
              className="animate-spin"
            />
            Deploying...
          </>
        ) : (
          <>
            <Rocket size={15} />
            Deploy
          </>
        )}
      </button>

      {error && (
        <p className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

