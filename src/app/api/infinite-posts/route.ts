import { NextRequest, NextResponse } from "next/server";

// 무한 스크롤 실습을 위한 대량의 Mock 데이터
const generatePosts = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `게시글 #${i + 1}`,
    body: `이것은 ${i + 1}번째 게시글의 내용입니다. 무한 스크롤 테스트를 위한 데이터입니다.`,
    createdAt: new Date(Date.now() - i * 1000 * 60 * 60).toISOString(),
  }));
};

const allPosts = generatePosts(100); // 100개의 게시글 생성

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// GET: 커서 기반 페이지네이션
export async function GET(request: NextRequest) {
  await delay(800); // 로딩 상태를 확인하기 위한 지연

  const { searchParams } = new URL(request.url);
  const cursor = parseInt(searchParams.get("cursor") || "0");
  const limit = parseInt(searchParams.get("limit") || "10");

  // 커서 위치부터 limit 개수만큼 데이터 반환
  const startIndex = cursor;
  const endIndex = startIndex + limit;
  const posts = allPosts.slice(startIndex, endIndex);

  // 다음 페이지가 있는지 확인
  const nextCursor = endIndex < allPosts.length ? endIndex : null;

  return NextResponse.json({
    data: posts,
    nextCursor,
    hasNextPage: nextCursor !== null,
  });
}
