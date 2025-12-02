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
            <li>• 모든 쿼리의 상태 확인 (fresh, stale, fetching, inactive)</li>
            <li>• 캐시된 데이터 실시간 조회 및 탐색</li>
            <li>• 수동으로 쿼리 동작 테스트 (refetch, invalidate 등)</li>
            <li>• 로딩/에러 상태 시뮬레이션</li>
            <li>• 실시간 상태 변화 모니터링</li>
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

      {/* 섹션 3: Devtools 화면 구성 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Devtools 화면 구성
        </h2>

        {/* 레이아웃 다이어그램 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">
            📐 레이아웃 구조
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* 좌측 패널 */}
            <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
              <div className="font-bold text-blue-700 dark:text-blue-300 mb-2">
                📋 좌측: 쿼리 목록
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 모든 쿼리가 리스트로 표시</li>
                <li>• 쿼리 키와 상태 색상 표시</li>
                <li>• 클릭하여 상세 정보 확인</li>
                <li>• 필터/정렬 기능 제공</li>
              </ul>
            </div>

            {/* 우측 패널 */}
            <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
              <div className="font-bold text-green-700 dark:text-green-300 mb-2">
                🔍 우측: 쿼리 상세
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Query Details (기본 정보)</li>
                <li>• Actions (실행 버튼들)</li>
                <li>• Data Explorer (캐시 데이터)</li>
                <li>• Query Explorer (쿼리 상세)</li>
              </ul>
            </div>
          </div>

          {/* 상태 색상 설명 */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              🎨 쿼리 상태 색상
            </h4>
            <div className="flex gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Fresh (신선)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Stale (오래됨)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Fetching (로딩중)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Inactive (비활성)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Error (에러)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 4: Query Details (쿼리 상세 정보) */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Query Details (쿼리 상세 정보)
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            쿼리를 클릭하면 우측 패널 상단에 <strong>Query Details</strong>가 표시됩니다.
            선택한 쿼리의 핵심 정보를 한눈에 보여줍니다.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <code className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono">
                Query Key
              </code>
              <div className="text-gray-700 dark:text-gray-300">
                <p className="font-medium">쿼리의 고유 식별자</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  예: [&quot;posts&quot;], [&quot;user&quot;, 123], [&quot;todos&quot;, {`{ status: "active" }`}]
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <code className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono">
                Observers
              </code>
              <div className="text-gray-700 dark:text-gray-300">
                <p className="font-medium">이 쿼리를 구독 중인 컴포넌트 수</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  0이면 inactive(비활성) 상태가 됨. 여러 컴포넌트가 같은 쿼리를 사용하면 숫자가 증가
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <code className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono">
                Last Updated
              </code>
              <div className="text-gray-700 dark:text-gray-300">
                <p className="font-medium">마지막으로 데이터를 가져온 시간</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  상대 시간으로 표시 (예: &quot;5 seconds ago&quot;)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <code className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono">
                Status
              </code>
              <div className="text-gray-700 dark:text-gray-300">
                <p className="font-medium">현재 쿼리 상태</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  pending(로딩), success(성공), error(에러) 중 하나
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 5: Actions (액션 버튼들) */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Actions (액션 버튼들)
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Query Details 아래에 있는 버튼들로, 선택한 쿼리에 대해 다양한 동작을 수동으로 실행할 수 있습니다.
          <strong> 디버깅과 테스트에 매우 유용</strong>합니다.
        </p>

        <div className="space-y-4">
          {/* Refetch */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border-l-4 border-blue-500 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium">
                Refetch
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                데이터 다시 가져오기
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              서버에서 데이터를 <strong>강제로 다시 fetch</strong>합니다.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-3 text-sm">
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                <strong>언제 사용?</strong>
              </p>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 캐시 상태와 관계없이 최신 데이터를 확인하고 싶을 때</li>
                <li>• 서버 데이터가 변경되었는지 확인할 때</li>
                <li>• 네트워크 요청이 제대로 동작하는지 테스트할 때</li>
              </ul>
            </div>
            <CodeBlock title="코드로 동일한 동작">{`// 특정 쿼리 refetch
queryClient.refetchQueries({ queryKey: ['posts'] });

// 또는 useQuery의 refetch 사용
const { refetch } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
refetch();`}</CodeBlock>
          </div>

          {/* Invalidate */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border-l-4 border-yellow-500 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-yellow-600 text-white rounded text-sm font-medium">
                Invalidate
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                캐시 무효화
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              캐시를 <strong>&quot;stale(오래됨)&quot; 상태로 표시</strong>합니다.
              현재 화면에 쿼리를 사용하는 컴포넌트가 있으면 자동으로 refetch됩니다.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-3 text-sm">
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                <strong>Refetch vs Invalidate 차이점</strong>
              </p>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• <strong>Refetch</strong>: 무조건 즉시 서버 요청</li>
                <li>• <strong>Invalidate</strong>: stale로 표시만 하고, 컴포넌트가 사용 중일 때만 refetch</li>
              </ul>
            </div>
            <CodeBlock title="코드로 동일한 동작">{`// 데이터 변경 후 캐시 무효화 (가장 흔한 패턴)
const mutation = useMutation({
  mutationFn: updatePost,
  onSuccess: () => {
    // 게시글 수정 후 목록 캐시 무효화
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
});`}</CodeBlock>
          </div>

          {/* Reset */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border-l-4 border-purple-500 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-purple-600 text-white rounded text-sm font-medium">
                Reset
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                쿼리 초기화
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              쿼리를 <strong>초기 상태로 되돌립니다</strong>. 캐시 데이터는 삭제되고,
              마치 처음 마운트된 것처럼 다시 로딩 상태부터 시작합니다.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-3 text-sm">
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                <strong>언제 사용?</strong>
              </p>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 초기 로딩 상태(스켈레톤 UI)를 테스트할 때</li>
                <li>• 쿼리의 전체 플로우를 처음부터 다시 확인할 때</li>
                <li>• 이전 데이터 없이 깨끗한 상태로 시작하고 싶을 때</li>
              </ul>
            </div>
            <CodeBlock title="코드로 동일한 동작">{`// 쿼리 초기화
queryClient.resetQueries({ queryKey: ['posts'] });`}</CodeBlock>
          </div>

          {/* Remove */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border-l-4 border-red-500 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-red-600 text-white rounded text-sm font-medium">
                Remove
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                쿼리 완전 삭제
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              쿼리를 캐시에서 <strong>완전히 제거</strong>합니다.
              Devtools 목록에서도 사라집니다.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-3 text-sm">
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                <strong>Reset vs Remove 차이점</strong>
              </p>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• <strong>Reset</strong>: 쿼리는 유지, 데이터만 초기화 후 다시 fetch</li>
                <li>• <strong>Remove</strong>: 쿼리 자체를 캐시에서 완전 삭제 (다시 마운트될 때 새로 생성)</li>
              </ul>
            </div>
            <CodeBlock title="코드로 동일한 동작">{`// 쿼리 완전 삭제
queryClient.removeQueries({ queryKey: ['posts'] });`}</CodeBlock>
          </div>

          {/* Trigger Loading */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border-l-4 border-cyan-500 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-cyan-600 text-white rounded text-sm font-medium">
                Trigger Loading
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                로딩 상태 시뮬레이션
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              실제 네트워크 요청 없이 <strong>로딩 상태를 강제로 발생</strong>시킵니다.
              UI 테스트에 유용합니다.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-3 text-sm">
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                <strong>언제 사용?</strong>
              </p>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 로딩 스피너나 스켈레톤 UI가 제대로 표시되는지 확인할 때</li>
                <li>• isLoading, isPending 상태의 UI를 테스트할 때</li>
                <li>• 느린 네트워크 상황을 시뮬레이션할 때</li>
              </ul>
            </div>
            <div className="mt-3 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded text-sm text-gray-700 dark:text-gray-300">
              💡 <strong>Tip:</strong> 버튼을 다시 클릭하면 로딩 상태가 해제됩니다.
            </div>
          </div>

          {/* Trigger Error */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border-l-4 border-orange-500 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-orange-600 text-white rounded text-sm font-medium">
                Trigger Error
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                에러 상태 시뮬레이션
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              실제 에러 없이 <strong>에러 상태를 강제로 발생</strong>시킵니다.
              에러 UI 테스트에 유용합니다.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-3 text-sm">
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                <strong>언제 사용?</strong>
              </p>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 에러 메시지나 에러 화면이 제대로 표시되는지 확인할 때</li>
                <li>• Error Boundary가 정상 동작하는지 테스트할 때</li>
                <li>• isError 상태의 UI를 테스트할 때</li>
              </ul>
            </div>
            <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded text-sm text-gray-700 dark:text-gray-300">
              💡 <strong>Tip:</strong> 버튼을 다시 클릭하면 에러 상태가 해제됩니다.
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 6: Data Explorer */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Data Explorer (데이터 탐색기)
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            캐시에 저장된 <strong>실제 데이터를 트리 구조</strong>로 보여줍니다.
            JSON 데이터를 펼치고 접으며 탐색할 수 있습니다.
          </p>

          {/* 예시 데이터 구조 */}
          <div className="bg-gray-900 rounded-lg p-4 mb-4 font-mono text-sm">
            <div className="text-gray-400">▼ Data</div>
            <div className="pl-4">
              <div className="text-gray-400">▼ Array(3)</div>
              <div className="pl-4">
                <div className="text-gray-400">▼ 0: Object</div>
                <div className="pl-4">
                  <div><span className="text-purple-400">id</span>: <span className="text-green-400">1</span></div>
                  <div><span className="text-purple-400">title</span>: <span className="text-yellow-400">&quot;첫 번째 게시글&quot;</span></div>
                  <div><span className="text-purple-400">completed</span>: <span className="text-blue-400">false</span></div>
                </div>
                <div className="text-gray-400">▶ 1: Object</div>
                <div className="text-gray-400">▶ 2: Object</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>복잡한 중첩 객체</strong>도 펼쳐서 확인 가능
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>배열의 길이</strong>와 각 항목을 쉽게 파악
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <p className="text-gray-700 dark:text-gray-300">
                데이터 타입이 <strong>색상으로 구분</strong>됨 (문자열, 숫자, boolean 등)
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <p className="text-gray-700 dark:text-gray-300">
                서버에서 받은 데이터가 <strong>예상대로 캐시</strong>되었는지 확인 가능
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-sm text-gray-700 dark:text-gray-300">
            💡 <strong>Tip:</strong> select 옵션으로 데이터를 변환했다면,
            Data Explorer에서는 <strong>원본 데이터</strong>가 표시됩니다.
            (select는 컴포넌트에 전달되는 데이터만 변환)
          </div>
        </div>
      </section>

      {/* 섹션 7: Query Explorer */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Query Explorer (쿼리 탐색기)
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            쿼리의 <strong>내부 상태와 설정값</strong>을 상세하게 보여줍니다.
            Data Explorer가 &quot;데이터&quot;를 보여준다면, Query Explorer는 &quot;쿼리 자체&quot;를 보여줍니다.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                📊 State (상태 정보)
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• <code>status</code>: pending / success / error</li>
                <li>• <code>fetchStatus</code>: idle / fetching / paused</li>
                <li>• <code>dataUpdatedAt</code>: 데이터 갱신 시간</li>
                <li>• <code>errorUpdatedAt</code>: 에러 발생 시간</li>
                <li>• <code>isInvalidated</code>: 무효화 여부</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                ⚙️ Options (설정값)
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• <code>staleTime</code>: 설정된 신선 시간</li>
                <li>• <code>gcTime</code>: 가비지 컬렉션 시간</li>
                <li>• <code>retry</code>: 재시도 설정</li>
                <li>• <code>refetchInterval</code>: 자동 refetch 간격</li>
                <li>• <code>enabled</code>: 쿼리 활성화 여부</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm text-gray-700 dark:text-gray-300">
            💡 <strong>디버깅 활용:</strong> 쿼리가 예상대로 동작하지 않을 때,
            Query Explorer에서 staleTime이나 gcTime이 의도한 값인지 확인해보세요.
          </div>
        </div>
      </section>

      {/* 섹션 8: Devtools 옵션 */}
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

      {/* 섹션 9: 실습 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          실습: Devtools 사용해보기
        </h2>
        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 border border-green-200 dark:border-green-800 mb-4">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>화면 하단의 TanStack Query 로고</strong>를 클릭하여 Devtools를
            열어보세요!
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            아래 데모에서 쿼리를 생성하고, Devtools에서 각 기능을 직접 테스트해보세요.
          </p>
        </div>

        <DevtoolsDemo />
      </section>

      {/* 섹션 10: 디버깅 팁 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          디버깅 시나리오별 가이드
        </h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              🔄 쿼리가 너무 자주 refetch되는 경우
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              Query Explorer에서 staleTime을 확인하세요. 기본값 0은 데이터를 항상 stale로 취급합니다.
            </p>
            <CodeBlock title="해결책">{`useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 1000 * 60 * 5, // 5분
});`}</CodeBlock>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              🗑️ 캐시가 빨리 사라지는 경우
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              Devtools에서 쿼리가 inactive 후 빠르게 사라진다면 gcTime을 확인하세요.
            </p>
            <CodeBlock title="해결책">{`useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  gcTime: 1000 * 60 * 30, // 30분
});`}</CodeBlock>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              🔑 동일 데이터가 중복 요청되는 경우
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              Devtools의 쿼리 목록에서 Query Key를 확인하세요. 키가 다르면 별도 캐시로 취급됩니다.
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 rounded p-3 text-sm mb-2">
              <p className="text-red-700 dark:text-red-300">❌ 잘못된 예: 객체 참조가 매번 다름</p>
              <code className="text-red-600 dark:text-red-400">
                queryKey: [{`{ page: 1 }`}] // 매 렌더링마다 새 객체
              </code>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded p-3 text-sm">
              <p className="text-green-700 dark:text-green-300">✅ 올바른 예: 원시값 사용</p>
              <code className="text-green-600 dark:text-green-400">
                queryKey: [&apos;posts&apos;, page] // 안정적인 키
              </code>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              📊 데이터가 예상과 다른 경우
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Data Explorer에서 캐시된 원본 데이터를 확인하세요. select로 변환된 데이터는
              컴포넌트에만 전달되며 캐시에는 원본이 저장됩니다.
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
                postsQuery.isFetching
                  ? "bg-blue-100 text-blue-800"
                  : postsQuery.isStale
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {postsQuery.isFetching ? "FETCHING" : postsQuery.isStale ? "STALE" : "FRESH"}
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
                todosQuery.isFetching
                  ? "bg-blue-100 text-blue-800"
                  : todosQuery.isStale
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {todosQuery.isFetching ? "FETCHING" : todosQuery.isStale ? "STALE" : "FRESH"}
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
          전체 쿼리 액션 (Devtools에서도 동일한 동작 가능):
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
            onClick={() => queryClient.resetQueries({ queryKey: ["posts", "devtools-demo"] })}
            className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
          >
            Posts Reset
          </button>
          <button
            onClick={() => queryClient.clear()}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Clear All Cache
          </button>
        </div>
      </div>

      {/* 실습 가이드 */}
      <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
        <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
          🎯 실습해보세요
        </h4>
        <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
          <li>1. 화면 하단의 TanStack Query 로고를 클릭하여 Devtools 열기</li>
          <li>2. 좌측에서 &quot;posts&quot; 또는 &quot;todos&quot; 쿼리 클릭</li>
          <li>3. 우측의 Actions에서 각 버튼을 클릭하며 동작 확인</li>
          <li>4. Data Explorer에서 캐시된 데이터 구조 탐색</li>
          <li>5. Query Explorer에서 staleTime, gcTime 등 설정값 확인</li>
          <li>6. &quot;Trigger Loading&quot; 클릭 후 UI 변화 관찰</li>
          <li>7. &quot;Trigger Error&quot; 클릭 후 에러 상태 확인</li>
        </ol>
      </div>
    </div>
  );
}
