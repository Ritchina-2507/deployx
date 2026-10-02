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

    const projects = await db.project.findMany({
      where: {
        userId: user.id,
      },
      include: {
        _count: {
          select: {
            deployments: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to load projects:", error);

    return NextResponse.json(
      { error: "Failed to load projects." },
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

    const name = String(body.name ?? "")
      .trim()
      .toLowerCase();

    const framework =
      String(body.framework ?? "Next.js").trim() ||
      "Next.js";

    const repository = body.repository
      ? String(body.repository).trim()
      : null;

    if (!/^[a-z0-9][a-z0-9-]{1,48}$/.test(name)) {
      return NextResponse.json(
        {
          error:
            "Project name must be 2-49 characters and contain only lowercase letters, numbers, and hyphens.",
        },
        { status: 400 }
      );
    }

    const existing = await db.project.findFirst({
      where: {
        userId: user.id,
        name,
      },
      select: {
        id: true,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          error: "Project already exists.",
        },
        { status: 409 }
      );
    }

    const project = await db.project.create({
      data: {
        name,
        framework,
        repository,
        userId: user.id,
      },
    });

    return NextResponse.json(project, {
      status: 201,
    });
  } catch (error) {
    console.error("Failed to create project:", error);

    return NextResponse.json(
      { error: "Failed to create project." },
      { status: 500 }
    );
  }
}