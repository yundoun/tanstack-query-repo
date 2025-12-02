import { NextRequest, NextResponse } from "next/server";
import { Todo } from "@/types";

// Mock 데이터
let todos: Todo[] = [
  { id: 1, title: "TanStack Query 설치하기", completed: true, createdAt: "2024-01-01T00:00:00Z" },
  { id: 2, title: "QueryClient 설정하기", completed: true, createdAt: "2024-01-02T00:00:00Z" },
  { id: 3, title: "useQuery 학습하기", completed: false, createdAt: "2024-01-03T00:00:00Z" },
  { id: 4, title: "useMutation 학습하기", completed: false, createdAt: "2024-01-04T00:00:00Z" },
  { id: 5, title: "캐싱 전략 이해하기", completed: false, createdAt: "2024-01-05T00:00:00Z" },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// GET: 모든 할일 가져오기
export async function GET(request: NextRequest) {
  await delay(500);

  const { searchParams } = new URL(request.url);
  const completed = searchParams.get("completed");

  let filteredTodos = todos;

  if (completed !== null) {
    filteredTodos = todos.filter(
      (todo) => todo.completed === (completed === "true")
    );
  }

  return NextResponse.json(filteredTodos);
}

// POST: 새 할일 생성
export async function POST(request: NextRequest) {
  await delay(500);

  const body = await request.json();
  const newTodo: Todo = {
    id: Math.max(...todos.map((t) => t.id), 0) + 1,
    title: body.title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);

  return NextResponse.json(newTodo, { status: 201 });
}
