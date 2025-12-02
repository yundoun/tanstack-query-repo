"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import ChapterLayout from "@/components/ChapterLayout";
import CodeBlock from "@/components/CodeBlock";
import PracticeGuide from "@/components/PracticeGuide";
import { fetchPosts } from "@/lib/api";
import { useState } from "react";

export default function CachingPage() {
  const [showSecondQuery, setShowSecondQuery] = useState(false);

  return (
    <ChapterLayout chapterNumber={2} title="데이터 캐싱">
      {/* 실습 가이드 */}
      <PracticeGuide
        title="캐싱 동작 방식 이해하기"
        description="TanStack Query의 캐싱이 어떻게 동작하는지 직접 확인해봅니다."
        steps={[
          {
            title: "컴포넌트 A 확인하기",
            description: "페이지 로드 시 '컴포넌트 A'가 서버에서 데이터를 가져옵니다. '로딩 중...' 상태를 확인하세요.",
            check: "로딩 후 '로드 완료' 배지와 게시글 목록이 표시됨",
          },
          {
            title: "Devtools 열기",
            description: "화면 하단의 TanStack Query 로고(꽃 모양)를 클릭하여 Devtools를 엽니다.",
            action: "하단 로고 클릭",
            check: "Devtools 패널이 열리고 ['posts'] 쿼리가 표시됨",
          },
          {
            title: "컴포넌트 B 표시하기",
            description: "'컴포넌트 B 표시하기' 버튼을 클릭합니다. 같은 queryKey를 사용하므로 캐시된 데이터가 즉시 표시됩니다.",
            action: "'컴포넌트 B 표시하기' 버튼 클릭",
            check: "로딩 없이 '캐시에서 즉시 로드!' 메시지와 함께 데이터 표시",
          },
          {
            title: "캐시 시간 비교하기",
            description: "컴포넌트 A와 B의 '마지막 업데이트' 시간이 동일한지 확인합니다. 같은 캐시를 공유하고 있습니다.",
            check: "두 컴포넌트의 업데이트 시간이 동일함",
          },
          {
            title: "캐시 상태 확인하기",
            description: "'현재 캐시 상태 확인' 버튼을 눌러 QueryClient에 저장된 캐시 정보를 확인합니다.",
            action: "'현재 캐시 상태 확인' 버튼 클릭",
            check: "JSON 형태로 쿼리 키, 상태, 업데이트 시간 표시",
          },
        ]}
        tips={[
          "Devtools에서 쿼리를 클릭하면 캐시된 데이터를 직접 확인할 수 있습니다",
          "같은 queryKey를 사용하는 컴포넌트들은 모두 같은 캐시를 공유합니다",
          "컴포넌트 B를 숨겼다가 다시 표시해도 캐시가 유지됩니다",
        ]}
      />

      {/* 섹션 1: 캐싱이란? */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          캐싱이란?
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>캐싱(Caching)</strong>은 데이터를 임시 저장소에 보관하여
            동일한 요청에 대해 빠르게 응답할 수 있도록 하는 기술입니다.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            TanStack Query는 가져온 데이터를{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              메모리에 자동으로 캐싱
            </span>
            하여 불필요한 네트워크 요청을 줄입니다.
          </p>
        </div>
      </section>

      {/* 섹션 2: 캐싱 동작 방식 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          TanStack Query의 캐싱 동작 방식
        </h2>
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-3">
              1단계: 첫 번째 요청
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              쿼리가 처음 실행되면, 서버에서 데이터를 가져와 캐시에 저장합니다.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-700 dark:text-green-300 mb-3">
              2단계: 캐시 재사용
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              동일한 쿼리 키로 요청하면, 캐시된 데이터를 즉시 반환합니다.
              네트워크 요청 없이 즉시 화면에 표시!
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-3">
              3단계: 백그라운드 갱신
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              데이터가 오래되었다면(stale), 백그라운드에서 새 데이터를 가져와
              캐시를 업데이트합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 섹션 3: 실습 - 캐싱 확인하기 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          실습: 캐싱 확인하기
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          아래 버튼을 클릭하여 두 번째 컴포넌트를 표시해보세요. 같은 쿼리 키를
          사용하면 캐시된 데이터가 즉시 표시됩니다.
        </p>

        <div className="space-y-4">
          {/* 첫 번째 쿼리 컴포넌트 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              컴포넌트 A - Posts 쿼리
            </h3>
            <FirstQueryComponent />
          </div>

          {/* 두 번째 컴포넌트 토글 */}
          <button
            onClick={() => setShowSecondQuery(!showSecondQuery)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showSecondQuery ? "컴포넌트 B 숨기기" : "컴포넌트 B 표시하기"}
          </button>

          {showSecondQuery && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-green-500 dark:border-green-400">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                컴포넌트 B - 같은 쿼리 키 사용 (캐시 재사용)
              </h3>
              <SecondQueryComponent />
            </div>
          )}
        </div>

        <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>확인해보세요:</strong> 컴포넌트 B를 표시할 때 로딩 없이
            데이터가 즉시 표시됩니다. 이것이 캐싱의 힘입니다!
          </p>
        </div>
      </section>

      {/* 섹션 4: 쿼리 키와 캐싱 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          쿼리 키와 캐싱
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          캐싱은 <strong>쿼리 키(Query Key)</strong>를 기준으로 동작합니다.
        </p>

        <CodeBlock title="쿼리 키 예시">{`// 같은 쿼리 키 = 같은 캐시
useQuery({ queryKey: ['posts'], queryFn: fetchPosts })
useQuery({ queryKey: ['posts'], queryFn: fetchPosts }) // 캐시 재사용!

// 다른 쿼리 키 = 다른 캐시
useQuery({ queryKey: ['posts'], queryFn: fetchPosts })
useQuery({ queryKey: ['posts', 1], queryFn: () => fetchPost(1) }) // 별도 캐시

// 쿼리 키 배열의 순서와 값이 모두 일치해야 같은 캐시
['posts', { page: 1 }]  // 캐시 A
['posts', { page: 2 }]  // 캐시 B (다른 캐시)`}</CodeBlock>
      </section>

      {/* 섹션 5: 캐시 상태 확인 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          실습: 캐시 상태 확인
        </h2>
        <CacheInspector />
      </section>

      {/* 코드 예시 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          코드 예시
        </h2>
        <CodeBlock title="캐싱을 활용한 컴포넌트">{`import { useQuery } from '@tanstack/react-query';

// 컴포넌트 A
function ComponentA() {
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // 첫 번째 마운트: 서버에서 데이터 가져옴
  // ...
}

// 컴포넌트 B (다른 곳에서 사용)
function ComponentB() {
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],  // 같은 쿼리 키!
    queryFn: fetchPosts,
  });

  // 캐시된 데이터 즉시 사용
  // isLoading이 false일 수 있음 (캐시 히트)
  // ...
}`}</CodeBlock>
      </section>
    </ChapterLayout>
  );
}

// 첫 번째 쿼리 컴포넌트
function FirstQueryComponent() {
  const { data, isLoading, isFetching, dataUpdatedAt } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(1, 3),
  });

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`px-2 py-1 rounded text-xs ${
            isLoading
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {isLoading ? "로딩 중..." : "로드 완료"}
        </span>
        {isFetching && !isLoading && (
          <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
            백그라운드 갱신 중
          </span>
        )}
      </div>
      {data && (
        <>
          <ul className="space-y-1">
            {data.data.map((post) => (
              <li key={post.id} className="text-gray-700 dark:text-gray-300">
                {post.id}. {post.title}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-2">
            마지막 업데이트: {new Date(dataUpdatedAt).toLocaleTimeString()}
          </p>
        </>
      )}
    </div>
  );
}

// 두 번째 쿼리 컴포넌트
function SecondQueryComponent() {
  const { data, isLoading, dataUpdatedAt } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(1, 3),
  });

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`px-2 py-1 rounded text-xs ${
            isLoading
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {isLoading ? "로딩 중..." : "캐시에서 즉시 로드!"}
        </span>
      </div>
      {data && (
        <>
          <ul className="space-y-1">
            {data.data.map((post) => (
              <li key={post.id} className="text-gray-700 dark:text-gray-300">
                {post.id}. {post.title}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-2">
            캐시 데이터 시간: {new Date(dataUpdatedAt).toLocaleTimeString()}
          </p>
        </>
      )}
    </div>
  );
}

// 캐시 상태 확인 컴포넌트
function CacheInspector() {
  const queryClient = useQueryClient();
  const [cacheInfo, setCacheInfo] = useState<string>("");

  const inspectCache = () => {
    const cache = queryClient.getQueryCache();
    const queries = cache.getAll();

    const info = queries.map((query) => ({
      key: query.queryKey,
      state: query.state.status,
      dataUpdatedAt: query.state.dataUpdatedAt
        ? new Date(query.state.dataUpdatedAt).toLocaleTimeString()
        : "없음",
    }));

    setCacheInfo(JSON.stringify(info, null, 2));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <button
        onClick={inspectCache}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mb-4"
      >
        현재 캐시 상태 확인
      </button>
      {cacheInfo && (
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
          {cacheInfo}
        </pre>
      )}
      <p className="text-sm text-gray-500 mt-2">
        Devtools(화면 하단)에서도 캐시 상태를 확인할 수 있습니다.
      </p>
    </div>
  );
}
