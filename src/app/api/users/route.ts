import { NextRequest, NextResponse } from "next/server";
import { User } from "@/types";

const users: User[] = [
  { id: 1, name: "김철수", email: "kim@example.com" },
  { id: 2, name: "이영희", email: "lee@example.com" },
  { id: 3, name: "박민수", email: "park@example.com" },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// GET: 모든 사용자 또는 단일 사용자 가져오기
export async function GET(request: NextRequest) {
  await delay(300);

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const user = users.find((u) => u.id === parseInt(id));
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  }

  return NextResponse.json(users);
}
