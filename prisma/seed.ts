import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding DeployX database...");

  const passwordHash = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: {
      email: "demo@deployx.dev",
    },
    update: {},
    create: {
      name: "Rita",
      email: "demo@deployx.dev",
      passwordHash,
    },
  });

  const project = await prisma.project.upsert({
    where: {
      id: "demo-portfolio-project",
    },
    update: {},
    create: {
      id: "demo-portfolio-project",
      name: "portfolio",
      framework: "Next.js",
      repository: "github.com/demo/portfolio",
      productionUrl: "https://portfolio.deployx.app",
      status: "ready",
      userId: user.id,
    },
  });

  const existingDeployment = await prisma.deployment.findFirst({
    where: {
      projectId: project.id,
    },
  });

  if (!existingDeployment) {
    await prisma.deployment.create({
      data: {
        projectId: project.id,
        status: "ready",
        environment: "production",
        branch: "main",
        deploymentUrl: "https://portfolio.deployx.app",
        buildLogs: "Build completed successfully.",
        finishedAt: new Date(),
      },
    });
  }

  console.log("✅ Database seeded successfully!");
  console.log("");
  console.log("Demo login:");
  console.log("Email: demo@deployx.dev");
  console.log("Password: password123");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });