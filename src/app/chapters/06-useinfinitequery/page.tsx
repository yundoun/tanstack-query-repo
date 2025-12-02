"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import ChapterLayout from "@/components/ChapterLayout";
import CodeBlock from "@/components/CodeBlock";
import PracticeGuide from "@/components/PracticeGuide";
import { fetchInfinitePosts } from "@/lib/api";
import { useEffect, useRef, useCallback } from "react";

export default function UseInfiniteQueryPage() {
  return (
    <ChapterLayout chapterNumber={6} title="useInfiniteQuery">
      {/* 실습 가이드 */}
      <PracticeGuide
        title="무한 스크롤 & 더 보기 버튼 실습"
        description="useInfiniteQuery를 사용하여 페이지네이션된 데이터를 점진적으로 로드하는 방법을 실습합니다."
        steps={[
          {
            title: "더 보기 버튼 실습",
            description: "'예제 1: 더 보기 버튼' 섹션에서 '더 보기' 버튼을 클릭하여 다음 페이지 데이터를 로드합니다.",
            action: "'더 보기' 버튼 3번 클릭",
            check: "총 로드된 항목 수가 5 → 10 → 15 → 20으로 증가, 페이지 수도 증가",
          },
          {
            title: "Devtools에서 pages 구조 확인",
            description: "Devtools를 열고 ['infinite-posts', 'load-more'] 쿼리를 클릭합니다. Data Explorer에서 pages 배열 구조를 확인합니다.",
            action: "Devtools에서 쿼리 클릭 후 Data 탭 확인",
            check: "data.pages 배열에 각 페이지 응답이 순서대로 저장됨",
          },
          {
            title: "hasNextPage 상태 확인",
            description: "계속 '더 보기'를 클릭하여 모든 데이터를 로드합니다. 마지막에 버튼 텍스트가 변경되는지 확인합니다.",
            action: "마지막 페이지까지 계속 클릭",
            check: "버튼 텍스트가 '마지막입니다'로 변경되고 비활성화됨",
          },
          {
            title: "무한 스크롤 실습",
            description: "'예제 2: 무한 스크롤' 섹션에서 스크롤 영역 안쪽을 아래로 스크롤합니다.",
            action: "회색 테두리 영역 안에서 마우스 휠로 스크롤",
            check: "스크롤이 맨 아래에 닿으면 자동으로 다음 페이지 로드",
          },
          {
            title: "Intersection Observer 동작 확인",
            description: "무한 스크롤 섹션 하단에 '스크롤하여 더 불러오기' 텍스트가 화면에 보일 때 자동 로드되는지 확인합니다.",
            check: "로딩 중... 표시 후 새 데이터가 추가됨",
          },
        ]}
        tips={[
          "getNextPageParam에서 null/undefined를 반환하면 hasNextPage가 false가 됩니다",
          "data.pages.flatMap(page => page.data)로 모든 데이터를 하나의 배열로 만들 수 있습니다",
          "isFetchingNextPage로 다음 페이지 로딩 중인지만 별도로 확인할 수 있습니다",
          "Intersection Observer는 지정한 요소가 화면에 보일 때 콜백을 실행합니다",
        ]}
      />

      {/* 섹션 1: 개요 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          useInfiniteQuery란?
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>useInfiniteQuery</strong>는 무한 스크롤이나 &quot;더 보기&quot;
            버튼과 같이 페이지네이션된 데이터를 점진적으로 로드할 때 사용합니다.
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>- 여러 페이지의 데이터를 하나의 쿼리로 관리</li>
            <li>- 다음/이전 페이지 자동 추적</li>
            <li>- 모든 페이지 데이터를 배열로 관리</li>
          </ul>
        </div>
      </section>

      {/* 섹션 2: 옵션 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          옵션
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">
                  옵션
                </th>
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">
                  설명
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>queryKey</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  쿼리를 식별하는 키 (useQuery와 동일)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>queryFn</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  데이터를 가져오는 함수. pageParam을 인자로 받음
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>initialPageParam</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  첫 페이지의 pageParam 값 (필수)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>getNextPageParam</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  다음 페이지의 pageParam을 반환하는 함수
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>getPreviousPageParam</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  이전 페이지의 pageParam을 반환하는 함수
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>maxPages</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  캐시에 저장할 최대 페이지 수
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock title="기본 구조">{`const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ['posts', 'infinite'],
  queryFn: ({ pageParam }) => fetchPosts(pageParam),
  initialPageParam: 0,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});`}</CodeBlock>
      </section>

      {/* 섹션 3: 반환값 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          반환값
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">
                  속성
                </th>
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">
                  설명
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>data.pages</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  모든 페이지 데이터의 배열
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>data.pageParams</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  각 페이지의 pageParam 배열
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>fetchNextPage</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  다음 페이지를 가져오는 함수
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>fetchPreviousPage</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  이전 페이지를 가져오는 함수
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>hasNextPage</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  다음 페이지 존재 여부 (boolean)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>hasPreviousPage</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  이전 페이지 존재 여부 (boolean)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>isFetchingNextPage</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  다음 페이지 로딩 중 여부
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>isFetchingPreviousPage</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  이전 페이지 로딩 중 여부
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 섹션 4: 예제 - 더 보기 버튼 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          예제 1: 더 보기 버튼
        </h2>
        <CodeBlock title="더 보기 버튼 구현">{`function LoadMorePosts() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.data.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ))}

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? '로딩 중...'
          : hasNextPage
          ? '더 보기'
          : '마지막 페이지'}
      </button>
    </div>
  );
}`}</CodeBlock>

        <LoadMoreDemo />
      </section>

      {/* 섹션 5: 예제 - 무한 스크롤 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          예제 2: 무한 스크롤
        </h2>
        <CodeBlock title="Intersection Observer로 무한 스크롤">{`function InfiniteScrollPosts() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  // 관찰 대상 ref
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.data.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      ))}

      {/* 이 요소가 화면에 보이면 다음 페이지 로드 */}
      <div ref={loadMoreRef}>
        {isFetchingNextPage && '로딩 중...'}
      </div>
    </div>
  );
}`}</CodeBlock>

        <InfiniteScrollDemo />
      </section>

      {/* 섹션 6: 데이터 구조 설명 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          data.pages 구조 이해하기
        </h2>
        <CodeBlock title="data 구조">{`// data.pages 는 각 페이지 응답의 배열입니다
data = {
  pages: [
    { data: [...], nextCursor: 10 },  // 첫 번째 페이지
    { data: [...], nextCursor: 20 },  // 두 번째 페이지
    { data: [...], nextCursor: 30 },  // 세 번째 페이지
  ],
  pageParams: [0, 10, 20],  // 각 페이지의 pageParam
}

// 모든 데이터를 평탄화하려면
const allPosts = data.pages.flatMap(page => page.data);`}</CodeBlock>
      </section>
    </ChapterLayout>
  );
}

// 더 보기 버튼 데모
function LoadMoreDemo() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["infinite-posts", "load-more"],
    queryFn: ({ pageParam }) => fetchInfinitePosts(pageParam, 5),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const totalItems = data?.pages.reduce((acc, page) => acc + page.data.length, 0) || 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mt-4">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">
        실습: 더 보기 버튼
      </h3>

      {isLoading ? (
        <div className="text-center py-4">로딩 중...</div>
      ) : (
        <>
          <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
            {data?.pages.map((page, pageIndex) => (
              <div key={pageIndex}>
                {page.data.map((post) => (
                  <div
                    key={post.id}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded mb-2"
                  >
                    <span className="text-blue-600 dark:text-blue-400 font-mono text-sm">
                      #{post.id}
                    </span>{" "}
                    {post.title}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              총 {totalItems}개 로드됨 | 페이지: {data?.pages.length || 0}
            </span>
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFetchingNextPage
                ? "로딩 중..."
                : hasNextPage
                ? "더 보기"
                : "마지막입니다"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// 무한 스크롤 데모
function InfiniteScrollDemo() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["infinite-posts", "scroll"],
    queryFn: ({ pageParam }) => fetchInfinitePosts(pageParam, 5),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [handleObserver]);

  const totalItems = data?.pages.reduce((acc, page) => acc + page.data.length, 0) || 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mt-4">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">
        실습: 무한 스크롤 (아래로 스크롤해보세요)
      </h3>

      {isLoading ? (
        <div className="text-center py-4">로딩 중...</div>
      ) : (
        <>
          <div className="space-y-2 max-h-80 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded p-4">
            {data?.pages.map((page, pageIndex) => (
              <div key={pageIndex}>
                {page.data.map((post) => (
                  <div
                    key={post.id}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded mb-2"
                  >
                    <span className="text-green-600 dark:text-green-400 font-mono text-sm">
                      #{post.id}
                    </span>{" "}
                    {post.title}
                  </div>
                ))}
              </div>
            ))}

            {/* 관찰 대상 요소 */}
            <div ref={loadMoreRef} className="py-4 text-center">
              {isFetchingNextPage ? (
                <span className="text-blue-600">로딩 중...</span>
              ) : hasNextPage ? (
                <span className="text-gray-400">
                  스크롤하여 더 불러오기
                </span>
              ) : (
                <span className="text-gray-400">모든 데이터를 불러왔습니다</span>
              )}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            총 {totalItems}개 로드됨 | 페이지: {data?.pages.length || 0}
          </div>
        </>
      )}
    </div>
  );
}
