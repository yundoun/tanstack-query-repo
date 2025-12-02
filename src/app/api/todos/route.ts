import { NextRequest, NextResponse } from "next/server";
import { todosStore } from "@/lib/data/store";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// GET: 모든 할일 가져오기
export async function GET(request: NextRequest) {
  await delay(500);

  const { searchParams } = new URL(request.url);
  const completed = searchParams.get("completed");

  let filteredTodos = todosStore.getAll();

  if (completed !== null) {
    filteredTodos = filteredTodos.filter(
      (todo) => todo.completed === (completed === "true")
    );
  }

  return NextResponse.json(filteredTodos);
}

// POST: 새 할일 생성
export async function POST(request: NextRequest) {
  await delay(500);

  const body = await request.json();
  const newTodo = todosStore.create(body.title);

  return NextResponse.json(newTodo, { status: 201 });
}
