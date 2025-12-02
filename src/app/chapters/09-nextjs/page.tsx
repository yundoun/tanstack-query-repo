"use client";

import ChapterLayout from "@/components/ChapterLayout";
import CodeBlock from "@/components/CodeBlock";

export default function NextjsPage() {
  return (
    <ChapterLayout chapterNumber={9} title="with Next.js">
      {/* 섹션 1: Next.js App Router */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Next.js App Router에서 사용하기
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Next.js 13+ App Router에서 TanStack Query를 사용하려면 몇 가지
            고려사항이 있습니다.
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              - <strong>서버 컴포넌트</strong>: React Server Components에서는
              useQuery 사용 불가
            </li>
            <li>
              - <strong>클라이언트 컴포넌트</strong>: &quot;use client&quot; 선언 필요
            </li>
            <li>
              - <strong>Provider 설정</strong>: 클라이언트 컴포넌트로 분리 필요
            </li>
          </ul>
        </div>
      </section>

      {/* 섹션 2: Provider 설정 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Provider 설정
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800 mb-4">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>중요:</strong> QueryClientProvider는 클라이언트
            컴포넌트에서만 사용 가능합니다. 별도 파일로 분리하세요.
          </p>
        </div>

        <CodeBlock title="providers/QueryProvider.tsx">{`"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useState로 인스턴스 생성 (SSR에서 요청마다 새 인스턴스 방지)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}`}</CodeBlock>

        <CodeBlock title="app/layout.tsx">{`import QueryProvider from "@/providers/QueryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}`}</CodeBlock>
      </section>

      {/* 섹션 3: 서버 컴포넌트 vs 클라이언트 컴포넌트 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          서버 컴포넌트 vs 클라이언트 컴포넌트
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-3">
              서버 컴포넌트 (RSC)
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>- 서버에서 렌더링</li>
              <li>- hooks 사용 불가 (useQuery X)</li>
              <li>- 직접 fetch 사용</li>
              <li>- async/await 가능</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-700 dark:text-green-300 mb-3">
              클라이언트 컴포넌트
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>- &quot;use client&quot; 선언 필요</li>
              <li>- hooks 사용 가능 (useQuery O)</li>
              <li>- TanStack Query 사용</li>
              <li>- 인터랙티브한 UI</li>
            </ul>
          </div>
        </div>

        <CodeBlock title="클라이언트 컴포넌트 예시">{`"use client";

import { useQuery } from "@tanstack/react-query";

export default function PostList() {
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <ul>
      {data?.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}`}</CodeBlock>
      </section>

      {/* 섹션 4: Hydration */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          SSR과 Hydration
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            서버에서 미리 데이터를 가져와 클라이언트에 전달하면 초기 로딩 시간을
            줄일 수 있습니다. 이를 <strong>Hydration</strong>이라고 합니다.
          </p>
        </div>

        <CodeBlock title="Prefetching과 Hydration">{`// app/posts/page.tsx (서버 컴포넌트)
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api";
import PostList from "./PostList"; // 클라이언트 컴포넌트

export default async function PostsPage() {
  const queryClient = new QueryClient();

  // 서버에서 미리 데이터 가져오기
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList />
    </HydrationBoundary>
  );
}`}</CodeBlock>

        <CodeBlock title="PostList.tsx (클라이언트 컴포넌트)">{`"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api";

export default function PostList() {
  // 서버에서 prefetch한 데이터가 즉시 사용됨
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // 서버에서 이미 데이터를 가져왔으므로 isLoading이 false일 수 있음
  if (isLoading) return <div>로딩 중...</div>;

  return (
    <ul>
      {data?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`}</CodeBlock>
      </section>

      {/* 섹션 5: Hydration 흐름 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Hydration 흐름
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                서버에서 QueryClient 생성
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                prefetchQuery로 데이터를 미리 가져옴
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                dehydrate로 상태 직렬화
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                캐시 데이터를 JSON으로 변환
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                HydrationBoundary로 전달
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                클라이언트로 상태 전달
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                클라이언트에서 hydrate
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                useQuery가 캐시된 데이터를 즉시 사용
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 6: 권장 패턴 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          권장 패턴
        </h2>
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">
              패턴 1: 클라이언트 전용 (간단한 경우)
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              SSR이 필요 없는 경우 단순히 클라이언트 컴포넌트에서 useQuery만
              사용합니다.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">
              패턴 2: Prefetch + Hydration (SEO/성능 중요)
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              초기 로딩 성능이나 SEO가 중요한 경우 서버에서 prefetch하여
              hydration합니다.
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">
              패턴 3: 서버 컴포넌트 직접 fetch
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              TanStack Query 없이 서버 컴포넌트에서 직접 데이터를 가져와 props로
              전달합니다. 단, 클라이언트에서 refetch가 필요 없는 경우에 적합합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 섹션 7: 주의사항 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          주의사항
        </h2>
        <div className="space-y-4">
          <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-4 border border-red-200 dark:border-red-800">
            <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">
              QueryClient 인스턴스 공유 금지
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              서버에서는 각 요청마다 새로운 QueryClient를 생성해야 합니다.
              전역으로 공유하면 사용자 간 데이터가 섞일 수 있습니다.
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">
              클라이언트에서 useState로 생성
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              클라이언트 Provider에서는 useState(() =&gt; new QueryClient())
              패턴을 사용하여 리렌더링마다 새 인스턴스가 생성되는 것을 방지합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 이 프로젝트 정보 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          이 프로젝트의 구성
        </h2>
        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 border border-green-200 dark:border-green-800">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            이 학습 프로젝트는 Next.js App Router와 TanStack Query가 함께
            설정되어 있습니다!
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              ✅ <code>src/providers/QueryProvider.tsx</code> - 클라이언트 Provider
            </li>
            <li>
              ✅ <code>src/app/layout.tsx</code> - Provider 적용
            </li>
            <li>✅ 각 챕터 페이지 - &quot;use client&quot; 선언</li>
            <li>✅ Mock API - App Router Route Handlers 사용</li>
          </ul>
        </div>
      </section>
    </ChapterLayout>
  );
}
