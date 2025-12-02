"use client";

import ChapterLayout from "@/components/ChapterLayout";
import CodeBlock from "@/components/CodeBlock";

export default function SetupPage() {
  return (
    <ChapterLayout chapterNumber={4} title="설치 및 구성">
      {/* 섹션 1: 설치 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          설치
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            TanStack Query와 개발자 도구를 함께 설치합니다.
          </p>
        </div>

        <CodeBlock title="npm">{`npm install @tanstack/react-query @tanstack/react-query-devtools`}</CodeBlock>

        <CodeBlock title="yarn">{`yarn add @tanstack/react-query @tanstack/react-query-devtools`}</CodeBlock>

        <CodeBlock title="pnpm">{`pnpm add @tanstack/react-query @tanstack/react-query-devtools`}</CodeBlock>
      </section>

      {/* 섹션 2: QueryClient */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          QueryClient
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>QueryClient</strong>는 TanStack Query의 핵심 객체입니다.
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>- 모든 쿼리와 뮤테이션을 관리</li>
            <li>- 캐시를 저장하고 관리</li>
            <li>- 기본 옵션을 설정</li>
          </ul>
        </div>

        <CodeBlock title="QueryClient 생성">{`import { QueryClient } from '@tanstack/react-query';

// 기본 생성
const queryClient = new QueryClient();

// 기본 옵션과 함께 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,      // 1분
      gcTime: 1000 * 60 * 5,     // 5분
      retry: 1,                   // 실패시 1번 재시도
      refetchOnWindowFocus: false, // 윈도우 포커스시 refetch 비활성화
    },
    mutations: {
      retry: 0,                   // 뮤테이션 실패시 재시도 안함
    },
  },
});`}</CodeBlock>
      </section>

      {/* 섹션 3: QueryClientProvider */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          QueryClientProvider
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>QueryClientProvider</strong>는 QueryClient를 React
            컴포넌트 트리에 제공합니다. 앱의 최상위에 배치해야 합니다.
          </p>
        </div>

        <CodeBlock title="React 앱에서 설정">{`// App.tsx 또는 main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 앱 컴포넌트들 */}
      <MyApp />

      {/* 개발자 도구 (개발 환경에서만 표시) */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}`}</CodeBlock>
      </section>

      {/* 섹션 4: Next.js App Router 설정 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Next.js App Router에서 설정
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800 mb-4">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>주의:</strong> Next.js App Router에서는 Provider를 클라이언트
            컴포넌트로 분리해야 합니다.
          </p>
        </div>

        <CodeBlock title="src/providers/QueryProvider.tsx">{`"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useState로 생성하여 각 요청마다 새 인스턴스 생성 방지
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
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

        <CodeBlock title="src/app/layout.tsx">{`import QueryProvider from "@/providers/QueryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}`}</CodeBlock>
      </section>

      {/* 섹션 5: 기본 옵션 설명 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          주요 기본 옵션
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">
                  옵션
                </th>
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">
                  기본값
                </th>
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">
                  설명
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>staleTime</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  0
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  데이터가 fresh로 유지되는 시간 (ms)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>gcTime</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  5분
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  미사용 데이터가 캐시에서 제거되기까지의 시간
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>retry</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  3
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  실패시 재시도 횟수
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>refetchOnWindowFocus</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  true
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  윈도우 포커스시 자동 refetch
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>refetchOnMount</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  true
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  컴포넌트 마운트시 refetch (stale 상태일 때)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>refetchOnReconnect</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  true
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  네트워크 재연결시 refetch
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 이 프로젝트의 설정 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          이 프로젝트의 설정
        </h2>
        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 border border-green-200 dark:border-green-800">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            이 학습 프로젝트는 이미 TanStack Query가 설정되어 있습니다!
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              ✅ <code>@tanstack/react-query</code> 설치됨
            </li>
            <li>
              ✅ <code>@tanstack/react-query-devtools</code> 설치됨
            </li>
            <li>
              ✅ <code>QueryProvider</code> 설정됨 (src/providers/QueryProvider.tsx)
            </li>
            <li>
              ✅ <code>layout.tsx</code>에서 Provider 적용됨
            </li>
            <li>✅ Devtools 활성화됨 (화면 하단 확인)</li>
          </ul>
        </div>
      </section>
    </ChapterLayout>
  );
}
