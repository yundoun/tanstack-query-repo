import { NextRequest, NextResponse } from "next/server";
import { todosStore } from "@/lib/data/store";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// GET: 단일 할일 가져오기
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(300);

  const { id } = await params;
  const todo = todosStore.getById(parseInt(id));

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
  const updated = todosStore.update(parseInt(id), body);

  if (!updated) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// DELETE: 할일 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(500);

  const { id } = await params;
  const deleted = todosStore.delete(parseInt(id));

  if (!deleted) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(deleted);
}
