"use client";

import { useQuery } from "@tanstack/react-query";
import ChapterLayout from "@/components/ChapterLayout";
import CodeBlock from "@/components/CodeBlock";
import { fetchPosts, fetchPost, fetchUsers } from "@/lib/api";
import { useState } from "react";
import { Post } from "@/types";

export default function UseQueryPage() {
  return (
    <ChapterLayout chapterNumber={5} title="useQuery">
      {/* 섹션 1: useQuery 기본 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          useQuery 기본 사용법
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>useQuery</strong>는 서버에서 데이터를 가져오는 가장 기본적인
            훅입니다. 필수로 <code>queryKey</code>와 <code>queryFn</code>을
            지정해야 합니다.
          </p>
        </div>

        <CodeBlock title="기본 구조">{`const result = useQuery({
  queryKey: ['todos'],      // 필수: 쿼리를 식별하는 키
  queryFn: fetchTodos,      // 필수: 데이터를 가져오는 함수
  // ... 기타 옵션들
});`}</CodeBlock>
      </section>

      {/* 섹션 2: queryKey */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          옵션: queryKey
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>queryKey</strong>는 쿼리를 고유하게 식별하는 배열입니다.
            캐싱, 리페칭, 공유의 기준이 됩니다.
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>- 반드시 배열 형태</li>
            <li>- 문자열, 숫자, 객체 등을 포함할 수 있음</li>
            <li>- 배열의 순서와 값이 모두 일치해야 같은 쿼리로 인식</li>
          </ul>
        </div>

        <CodeBlock title="queryKey 예시">{`// 단순 키
queryKey: ['todos']

// ID를 포함한 키
queryKey: ['todo', todoId]

// 필터를 포함한 키
queryKey: ['todos', { status: 'completed' }]

// 계층적 키 (권장 패턴)
queryKey: ['todos', 'list']
queryKey: ['todos', 'detail', todoId]
queryKey: ['users', userId, 'posts']`}</CodeBlock>
      </section>

      {/* 섹션 3: queryFn */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          옵션: queryFn
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>queryFn</strong>은 실제로 데이터를 가져오는 비동기 함수입니다.
            Promise를 반환해야 합니다.
          </p>
        </div>

        <CodeBlock title="queryFn 예시">{`// 직접 fetch 사용
queryFn: () => fetch('/api/todos').then(res => res.json())

// 별도 함수 사용
queryFn: fetchTodos

// 파라미터 전달
queryFn: () => fetchTodo(todoId)

// queryKey 값 사용 (context에서 접근)
queryFn: ({ queryKey }) => {
  const [, todoId] = queryKey;
  return fetchTodo(todoId);
}`}</CodeBlock>
      </section>

      {/* 섹션 4: select */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          옵션: select
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>select</strong>는 가져온 데이터를 변환하거나 일부만 선택할 때
            사용합니다. 캐시에는 원본 데이터가 저장됩니다.
          </p>
        </div>

        <CodeBlock title="select 예시">{`// 데이터 변환
const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  select: (data) => data.map(post => post.title), // 제목만 추출
});

// 필터링
const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  select: (data) => data.filter(todo => !todo.completed), // 미완료만
});

// 정렬
const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  select: (data) => [...data].sort((a, b) => b.id - a.id), // 최신순
});`}</CodeBlock>

        <SelectDemo />
      </section>

      {/* 섹션 5: placeholderData */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          옵션: placeholderData
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>placeholderData</strong>는 실제 데이터가 로드되기 전에 표시할
            임시 데이터입니다. 로딩 스피너 대신 의미 있는 UI를 보여줄 수 있습니다.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            * initialData와 달리 캐시에 저장되지 않습니다.
          </p>
        </div>

        <CodeBlock title="placeholderData 예시">{`// 정적 placeholder
const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  placeholderData: [], // 빈 배열로 시작
});

// 이전 데이터를 placeholder로 사용 (페이지네이션에 유용)
import { keepPreviousData } from '@tanstack/react-query';

const { data } = useQuery({
  queryKey: ['posts', page],
  queryFn: () => fetchPosts(page),
  placeholderData: keepPreviousData, // 이전 페이지 데이터 유지
});`}</CodeBlock>

        <PlaceholderDataDemo />
      </section>

      {/* 섹션 6: structuralSharing */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          옵션: structuralSharing
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>structuralSharing</strong>은 이전 데이터와 새 데이터를 비교하여
            변경된 부분만 업데이트하는 최적화 기능입니다.
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>- 기본값: true</li>
            <li>- 불필요한 리렌더링 방지</li>
            <li>- JSON 직렬화 가능한 데이터에만 동작</li>
          </ul>
        </div>

        <CodeBlock title="structuralSharing 예시">{`// 기본 (활성화)
const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  structuralSharing: true, // 기본값
});

// 비활성화 (특수한 경우)
const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  structuralSharing: false, // 매번 새 참조 생성
});`}</CodeBlock>
      </section>

      {/* 섹션 7: meta */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          옵션: meta
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>meta</strong>는 쿼리에 메타데이터를 추가할 때 사용합니다.
            전역 에러 핸들러나 로깅에서 활용할 수 있습니다.
          </p>
        </div>

        <CodeBlock title="meta 예시">{`const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  meta: {
    errorMessage: '게시글을 불러오는데 실패했습니다.',
    requiresAuth: true,
  },
});

// 전역 에러 핸들러에서 사용
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.errorMessage) {
        toast.error(query.meta.errorMessage);
      }
    },
  }),
});`}</CodeBlock>
      </section>

      {/* 섹션 8: 반환값 */}
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
                  타입
                </th>
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">
                  설명
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>data</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  TData | undefined
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  쿼리 결과 데이터
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>error</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  TError | null
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  발생한 에러 객체
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>status</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  string
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  &apos;pending&apos; | &apos;error&apos; | &apos;success&apos;
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>fetchStatus</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  string
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  &apos;fetching&apos; | &apos;paused&apos; | &apos;idle&apos;
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  <code>refetch</code>
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  function
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  수동으로 refetch 실행
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 섹션 9: 상태 확인 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          상태 확인
        </h2>
        <CodeBlock title="상태 플래그">{`const {
  data,
  error,
  isLoading,     // 첫 로딩 중 (캐시 없음)
  isFetching,    // 데이터 가져오는 중 (백그라운드 포함)
  isError,       // 에러 발생
  isSuccess,     // 성공
  isPending,     // 로딩 중 (isLoading과 유사)
  isStale,       // 데이터가 stale 상태
} = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
});

// 사용 예시
if (isLoading) return <Spinner />;
if (isError) return <Error message={error.message} />;
return <PostList posts={data} />;`}</CodeBlock>

        <StatusDemo />
      </section>

      {/* 섹션 10: 다시 가져오기 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          다시 가져오기 (Refetch)
        </h2>
        <CodeBlock title="refetch 옵션들">{`const { data, refetch } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,

  // 자동 refetch 조건
  refetchOnWindowFocus: true,    // 윈도우 포커스시
  refetchOnMount: true,          // 컴포넌트 마운트시
  refetchOnReconnect: true,      // 네트워크 재연결시
  refetchInterval: 5000,         // 5초마다 자동 refetch
  refetchIntervalInBackground: false, // 백그라운드에서도 interval 실행
});

// 수동 refetch
<button onClick={() => refetch()}>새로고침</button>`}</CodeBlock>

        <RefetchDemo />
      </section>
    </ChapterLayout>
  );
}

// Select 데모 컴포넌트
function SelectDemo() {
  const [selectType, setSelectType] = useState<"all" | "titles" | "first3">("all");

  const { data, isLoading } = useQuery({
    queryKey: ["posts-select-demo"],
    queryFn: () => fetchPosts(1, 5),
    select: (response) => {
      switch (selectType) {
        case "titles":
          return response.data.map((post) => post.title);
        case "first3":
          return response.data.slice(0, 3);
        default:
          return response.data;
      }
    },
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mt-4">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">
        실습: select로 데이터 변환
      </h3>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSelectType("all")}
          className={`px-3 py-1 rounded ${
            selectType === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          전체 데이터
        </button>
        <button
          onClick={() => setSelectType("titles")}
          className={`px-3 py-1 rounded ${
            selectType === "titles"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          제목만
        </button>
        <button
          onClick={() => setSelectType("first3")}
          className={`px-3 py-1 rounded ${
            selectType === "first3"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          처음 3개만
        </button>
      </div>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-x-auto text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

// PlaceholderData 데모 컴포넌트
function PlaceholderDataDemo() {
  const [postId, setPostId] = useState(1);

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
    placeholderData: (previousData) => previousData, // 이전 데이터 유지
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mt-4">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">
        실습: placeholderData로 부드러운 전환
      </h3>
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((id) => (
          <button
            key={id}
            onClick={() => setPostId(id)}
            className={`px-3 py-1 rounded ${
              postId === id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            Post {id}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mb-2">
        {isLoading && (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
            로딩 중
          </span>
        )}
        {isPlaceholderData && (
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
            Placeholder 데이터 표시 중
          </span>
        )}
      </div>
      {data && (
        <div className={isPlaceholderData ? "opacity-50" : ""}>
          <h4 className="font-semibold">{data.title}</h4>
          <p className="text-gray-600 dark:text-gray-400">{data.body}</p>
        </div>
      )}
    </div>
  );
}

// Status 데모 컴포넌트
function StatusDemo() {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    isPending,
    isStale,
    status,
    fetchStatus,
    refetch,
  } = useQuery({
    queryKey: ["posts-status-demo"],
    queryFn: () => fetchPosts(1, 3),
    staleTime: 10000, // 10초
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mt-4">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">
        실습: 쿼리 상태 확인
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        <StatusBadge label="isLoading" value={isLoading} />
        <StatusBadge label="isFetching" value={isFetching} />
        <StatusBadge label="isPending" value={isPending} />
        <StatusBadge label="isSuccess" value={isSuccess} />
        <StatusBadge label="isError" value={isError} />
        <StatusBadge label="isStale" value={isStale} />
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <p>status: {status}</p>
        <p>fetchStatus: {fetchStatus}</p>
      </div>
      <button
        onClick={() => refetch()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Refetch
      </button>
    </div>
  );
}

function StatusBadge({ label, value }: { label: string; value: boolean }) {
  return (
    <div
      className={`px-2 py-1 rounded text-xs text-center ${
        value
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
      }`}
    >
      {label}: {value ? "true" : "false"}
    </div>
  );
}

// Refetch 데모 컴포넌트
function RefetchDemo() {
  const { data, isFetching, dataUpdatedAt, refetch } = useQuery({
    queryKey: ["posts-refetch-demo"],
    queryFn: () => fetchPosts(1, 3),
    refetchOnWindowFocus: true,
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mt-4">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">
        실습: 수동 Refetch
      </h3>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isFetching ? "가져오는 중..." : "수동 Refetch"}
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        마지막 업데이트: {new Date(dataUpdatedAt).toLocaleTimeString()}
      </p>
      <p className="text-sm text-gray-500">
        * 다른 탭으로 이동했다가 돌아오면 자동으로 refetch됩니다 (refetchOnWindowFocus: true)
      </p>
    </div>
  );
}
