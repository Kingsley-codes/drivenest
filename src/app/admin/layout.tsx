// app/admin/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Get JWT token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  // 2. If no token, redirect to login
  if (!token) {
    redirect("/login?from=/admin");
  }

  try {
    // 3. Verify token and check role
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      role: string;
    };

    // 4. If not admin, redirect to login
    if (decoded.role !== "admin") {
      redirect("/login?from=/admin");
    }
  } catch (err) {
    // 5. Handle invalid/expired tokens
    console.error("JWT verification failed:", err);
    redirect("/login?from=/admin");
  }

  // 6. If all checks pass, render admin pages
  return <>{children}</>;
}
