import { NextRequest, NextResponse } from "next/server";
import { Todo } from "@/types";

let todos: Todo[] = [
  { id: 1, title: "TanStack Query 설치하기", completed: true, createdAt: "2024-01-01T00:00:00Z" },
  { id: 2, title: "QueryClient 설정하기", completed: true, createdAt: "2024-01-02T00:00:00Z" },
  { id: 3, title: "useQuery 학습하기", completed: false, createdAt: "2024-01-03T00:00:00Z" },
  { id: 4, title: "useMutation 학습하기", completed: false, createdAt: "2024-01-04T00:00:00Z" },
  { id: 5, title: "캐싱 전략 이해하기", completed: false, createdAt: "2024-01-05T00:00:00Z" },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// GET: 단일 할일 가져오기
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(300);

  const { id } = await params;
  const todo = todos.find((t) => t.id === parseInt(id));

  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(todo);
}

// PATCH: 할일 수정 (부분 업데이트)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(500);

  const { id } = await params;
  const body = await request.json();
  const todoIndex = todos.findIndex((t) => t.id === parseInt(id));

  if (todoIndex === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    ...body,
  };

  return NextResponse.json(todos[todoIndex]);
}

// DELETE: 할일 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(500);

  const { id } = await params;
  const todoIndex = todos.findIndex((t) => t.id === parseInt(id));

  if (todoIndex === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  const deletedTodo = todos[todoIndex];
  todos = todos.filter((t) => t.id !== parseInt(id));

  return NextResponse.json(deletedTodo);
}
