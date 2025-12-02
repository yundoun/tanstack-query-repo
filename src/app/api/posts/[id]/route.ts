import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/types";

// 부모 route.ts와 데이터 공유를 위해 전역 상태 사용
// 실제 프로젝트에서는 데이터베이스를 사용합니다
let posts: Post[] = [
  { id: 1, title: "TanStack Query 소개", body: "TanStack Query는 강력한 서버 상태 관리 라이브러리입니다.", userId: 1 },
  { id: 2, title: "useQuery 기초", body: "useQuery는 데이터를 가져오는 기본 훅입니다.", userId: 1 },
  { id: 3, title: "useMutation 사용법", body: "useMutation은 데이터를 변경할 때 사용합니다.", userId: 2 },
  { id: 4, title: "캐싱 전략", body: "TanStack Query의 캐싱은 매우 강력합니다.", userId: 2 },
  { id: 5, title: "staleTime vs gcTime", body: "두 옵션의 차이를 이해하는 것이 중요합니다.", userId: 1 },
  { id: 6, title: "Infinite Query", body: "무한 스크롤을 구현할 때 사용합니다.", userId: 3 },
  { id: 7, title: "Optimistic Updates", body: "낙관적 업데이트로 UX를 개선할 수 있습니다.", userId: 3 },
  { id: 8, title: "Query Invalidation", body: "캐시 무효화는 데이터 동기화의 핵심입니다.", userId: 1 },
  { id: 9, title: "에러 처리", body: "에러 바운더리와 함께 사용하면 좋습니다.", userId: 2 },
  { id: 10, title: "SSR과 TanStack Query", body: "Next.js와 함께 사용하는 방법을 알아봅니다.", userId: 3 },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// GET: 단일 게시글 가져오기
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(300);

  const { id } = await params;
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

// PUT: 게시글 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(500);

  const { id } = await params;
  const body = await request.json();
  const postIndex = posts.findIndex((p) => p.id === parseInt(id));

  if (postIndex === -1) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  posts[postIndex] = {
    ...posts[postIndex],
    ...body,
  };

  return NextResponse.json(posts[postIndex]);
}

// DELETE: 게시글 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(500);

  const { id } = await params;
  const postIndex = posts.findIndex((p) => p.id === parseInt(id));

  if (postIndex === -1) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const deletedPost = posts[postIndex];
  posts = posts.filter((p) => p.id !== parseInt(id));

  return NextResponse.json(deletedPost);
}
