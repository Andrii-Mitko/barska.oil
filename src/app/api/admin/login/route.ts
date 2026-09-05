import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { login, password } = await request.json();

  const adminLogin = process.env.ADMIN_LOGIN;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!adminLogin || !adminPassword || !sessionSecret) {
    return NextResponse.json(
      { error: "Адмінка не налаштована на сервері" },
      { status: 500 },
    );
  }

  if (login !== adminLogin || password !== adminPassword) {
    return NextResponse.json(
      { error: "Невірний логін або пароль" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("admin_session", sessionSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 днів
  });

  return response;
}
