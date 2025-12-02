import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/types";

// 메모리에 저장되는 Mock 데이터
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

// 의도적인 지연을 추가하여 로딩 상태를 확인할 수 있게 함
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// GET: 모든 게시글 또는 페이지네이션된 게시글 가져오기
export async function GET(request: NextRequest) {
  await delay(500); // 500ms 지연

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const userId = searchParams.get("userId");

  let filteredPosts = posts;

  // userId로 필터링
  if (userId) {
    filteredPosts = posts.filter((post) => post.userId === parseInt(userId));
  }

  // 페이지네이션
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return NextResponse.json({
    data: paginatedPosts,
    page,
    limit,
    total: filteredPosts.length,
    totalPages: Math.ceil(filteredPosts.length / limit),
  });
}

// POST: 새 게시글 생성
export async function POST(request: NextRequest) {
  await delay(500);

  const body = await request.json();
  const newPost: Post = {
    id: Math.max(...posts.map((p) => p.id)) + 1,
    title: body.title,
    body: body.body,
    userId: body.userId,
  };

  posts.push(newPost);

  return NextResponse.json(newPost, { status: 201 });
}
