import { NextResponse } from "next/server";
import { hasUsers } from "@/lib/users";

export async function GET() {
  const hasAnyUsers = await hasUsers();
  return NextResponse.json({ hasUsers: hasAnyUsers });
}
