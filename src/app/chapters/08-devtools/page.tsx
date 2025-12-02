"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import ChapterLayout from "@/components/ChapterLayout";
import CodeBlock from "@/components/CodeBlock";
import { fetchPosts, fetchTodos } from "@/lib/api";

export default function DevtoolsPage() {
  return (
    <ChapterLayout chapterNumber={8} title="개발자 도구">
      {/* 섹션 1: React Query Devtools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          React Query Devtools
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>React Query Devtools</strong>는 TanStack Query의 상태를
            시각적으로 확인하고 디버깅할 수 있는 도구입니다.
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>- 모든 쿼리의 상태 확인</li>
            <li>- 캐시된 데이터 조회</li>
            <li>- 수동으로 refetch 실행</li>
            <li>- 쿼리 삭제 및 초기화</li>
            <li>- 실시간 상태 변화 모니터링</li>
          </ul>
        </div>
      </section>

      {/* 섹션 2: 설치 및 설정 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          설치 및 설정
        </h2>
        <CodeBlock title="설치">{`npm install @tanstack/react-query-devtools`}</CodeBlock>

        <CodeBlock title="설정">{`import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyApp />
      {/* 개발 환경에서만 표시됨 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}`}</CodeBlock>

        <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800 mt-4">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>참고:</strong> Devtools는 프로덕션 빌드에서 자동으로
            제외됩니다. 별도의 조건문 없이 사용해도 됩니다.
          </p>
        </div>
      </section>

      {/* 섹션 3: Devtools 옵션 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Devtools 옵션
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
                  <code>initialIsOpen</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  false
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  초기 열림 상태
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>buttonPosition</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  bottom-right
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  토글 버튼 위치 (top-left, top-right, bottom-left, bottom-right)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>position</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  bottom
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  패널 위치 (top, bottom, left, right)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock title="옵션 예시">{`<ReactQueryDevtools
  initialIsOpen={false}
  buttonPosition="bottom-right"
  position="bottom"
/>`}</CodeBlock>
      </section>

      {/* 섹션 4: Devtools 사용법 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Devtools 사용법
        </h2>

        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              1. 쿼리 목록 확인
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              왼쪽 패널에서 모든 쿼리 목록을 확인할 수 있습니다. 각 쿼리의 상태가
              색상으로 표시됩니다.
            </p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                fresh (초록)
              </span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                stale (노랑)
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                fetching (파랑)
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                inactive (회색)
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              2. 쿼리 상세 정보
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              쿼리를 클릭하면 상세 정보를 볼 수 있습니다:
            </p>
            <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-400">
              <li>- Query Key: 쿼리 식별자</li>
              <li>- Observers: 쿼리를 사용하는 컴포넌트 수</li>
              <li>- Last Updated: 마지막 업데이트 시간</li>
              <li>- Data: 캐시된 데이터 (JSON 형식)</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              3. 쿼리 액션
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              각 쿼리에 대해 다음 액션을 수행할 수 있습니다:
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                Refetch
              </span>
              <span className="px-3 py-1 bg-yellow-600 text-white rounded text-sm">
                Invalidate
              </span>
              <span className="px-3 py-1 bg-purple-600 text-white rounded text-sm">
                Reset
              </span>
              <span className="px-3 py-1 bg-red-600 text-white rounded text-sm">
                Remove
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 5: 실습 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          실습: Devtools 사용해보기
        </h2>
        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 border border-green-200 dark:border-green-800 mb-4">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>화면 하단의 TanStack Query 로고</strong>를 클릭하여 Devtools를
            열어보세요!
          </p>
        </div>

        <DevtoolsDemo />
      </section>

      {/* 섹션 6: 디버깅 팁 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          디버깅 팁
        </h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              쿼리가 너무 자주 refetch되는 경우
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              staleTime을 늘려보세요. 기본값 0은 데이터를 항상 stale로 취급합니다.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              캐시가 빨리 사라지는 경우
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              gcTime을 늘려보세요. 기본값 5분 후 inactive 쿼리가 삭제됩니다.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              쿼리 키 확인
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Devtools에서 쿼리 키를 확인하여 의도한 대로 캐싱이 되고 있는지
              확인하세요.
            </p>
          </div>
        </div>
      </section>

      {/* 프로덕션 빌드 정보 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          프로덕션 빌드
        </h2>
        <CodeBlock title="프로덕션에서 완전히 제외하기">{`// 필요한 경우 조건부 로딩
const ReactQueryDevtools = process.env.NODE_ENV === 'development'
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((d) => ({
        default: d.ReactQueryDevtools,
      }))
    )
  : () => null;`}</CodeBlock>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800 mt-4">
          <p className="text-gray-700 dark:text-gray-300">
            일반적으로 <code>@tanstack/react-query-devtools</code>는 프로덕션
            빌드에서 자동으로 빈 컴포넌트로 대체되므로 별도 처리가 필요 없습니다.
          </p>
        </div>
      </section>
    </ChapterLayout>
  );
}

// Devtools 데모 컴포넌트
function DevtoolsDemo() {
  const queryClient = useQueryClient();

  // 여러 쿼리 생성
  const postsQuery = useQuery({
    queryKey: ["posts", "devtools-demo"],
    queryFn: () => fetchPosts(1, 3),
    staleTime: 30000, // 30초
  });

  const todosQuery = useQuery({
    queryKey: ["todos", "devtools-demo"],
    queryFn: fetchTodos,
    staleTime: 10000, // 10초
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">
        Devtools에서 확인할 쿼리들
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Posts 쿼리 */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-900 dark:text-white">
              Posts 쿼리
            </span>
            <span
              className={`px-2 py-1 rounded text-xs ${
                postsQuery.isStale
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {postsQuery.isStale ? "STALE" : "FRESH"}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            queryKey: [&quot;posts&quot;, &quot;devtools-demo&quot;]
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            staleTime: 30초
          </p>
          <button
            onClick={() => postsQuery.refetch()}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Refetch
          </button>
        </div>

        {/* Todos 쿼리 */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-900 dark:text-white">
              Todos 쿼리
            </span>
            <span
              className={`px-2 py-1 rounded text-xs ${
                todosQuery.isStale
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {todosQuery.isStale ? "STALE" : "FRESH"}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            queryKey: [&quot;todos&quot;, &quot;devtools-demo&quot;]
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            staleTime: 10초
          </p>
          <button
            onClick={() => todosQuery.refetch()}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Refetch
          </button>
        </div>
      </div>

      {/* 액션 버튼들 */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          전체 쿼리 액션:
        </p>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["posts"] })
            }
            className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
          >
            Posts Invalidate
          </button>
          <button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["todos"] })
            }
            className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
          >
            Todos Invalidate
          </button>
          <button
            onClick={() => queryClient.clear()}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Clear All Cache
          </button>
        </div>
      </div>

      {/* 안내 */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>확인해보세요:</strong> 화면 하단의 TanStack Query 로고를
          클릭하고, 위 쿼리들의 상태 변화를 관찰해보세요. Refetch 버튼을 누르거나
          시간이 지나면 상태가 변합니다.
        </p>
      </div>
    </div>
  );
}
