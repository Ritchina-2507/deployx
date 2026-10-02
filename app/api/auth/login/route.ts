import { NextResponse } from "next/server";
import { authenticate, createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email ?? "").trim();
    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await authenticate(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { error: "Unable to log in." },
      { status: 500 }
    );
  }
}