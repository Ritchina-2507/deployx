import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "deployx_session";

function getSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET is not configured.");
  }

  return new TextEncoder().encode(secret);
}

export async function authenticate(
  email: string,
  password: string
) {
  const user = await db.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (!user) {
    return null;
  }

  const validPassword = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!validPassword) {
    return null;
  }

  return user;
}

export async function createSession(userId: string) {
  const token = await new SignJWT({
    userId,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      getSecret()
    );

    const userId = payload.userId;

    if (typeof userId !== "string") {
      return null;
    }

    return await db.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
}