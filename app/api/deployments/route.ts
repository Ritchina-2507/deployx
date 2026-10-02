import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const deployments = await db.deployment.findMany({
      where: {
        project: {
          userId: user.id,
        },
      },
      include: {
        project: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(deployments);
  } catch (error) {
    console.error("Failed to load deployments:", error);

    return NextResponse.json(
      { error: "Failed to load deployments." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const projectId = String(body.projectId ?? "").trim();
    const branch = String(body.branch ?? "main").trim() || "main";

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required." },
        { status: 400 }
      );
    }

    const project = await db.project.findFirst({
      where: {
        id: projectId,
        userId: user.id,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );
    }

    const deployment = await db.deployment.create({
      data: {
        projectId: project.id,
        status: "queued",
        environment: "production",
        branch,
        buildLogs: "Deployment queued...",
      },
    });

    await db.project.update({
      where: {
        id: project.id,
      },
      data: {
        status: "building",
      },
    });

    return NextResponse.json(
      {
        deployment,
        project: {
          id: project.id,
          name: project.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create deployment:", error);

    return NextResponse.json(
      { error: "Failed to create deployment." },
      { status: 500 }
    );
  }
}

