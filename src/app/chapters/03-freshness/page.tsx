"use client";

import { useQuery } from "@tanstack/react-query";
import ChapterLayout from "@/components/ChapterLayout";
import CodeBlock from "@/components/CodeBlock";
import { fetchTodos } from "@/lib/api";
import { useState } from "react";

export default function FreshnessPage() {
  return (
    <ChapterLayout chapterNumber={3} title="데이터의 신선도">
      {/* 섹션 1: Fresh vs Stale */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Fresh vs Stale 상태
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-700 dark:text-green-300 mb-3">
              Fresh (신선한 상태)
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>- 데이터가 최신인 상태</li>
              <li>- 백그라운드 refetch 하지 않음</li>
              <li>- 캐시 데이터를 그대로 사용</li>
            </ul>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-3">
              Stale (오래된 상태)
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>- 데이터가 오래된 상태</li>
              <li>- 조건 충족시 백그라운드 refetch</li>
              <li>- 캐시 데이터 먼저 표시 후 갱신</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 섹션 2: staleTime */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          staleTime
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>staleTime</strong>은 데이터가{" "}
            <span className="text-green-600 dark:text-green-400">fresh</span>{" "}
            상태로 유지되는 시간입니다.
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              - <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">staleTime: 0</code> (기본값): 데이터를 가져오자마자 stale 상태가 됨
            </li>
            <li>
              - <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">staleTime: 1000 * 60</code>: 1분 동안 fresh 상태 유지
            </li>
            <li>
              - <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">staleTime: Infinity</code>: 영원히 fresh 상태 유지
            </li>
          </ul>
        </div>

        <CodeBlock title="staleTime 설정 예시">{`const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
});

// 5분 내에 같은 쿼리 호출 시:
// - 캐시 데이터 즉시 반환
// - 백그라운드 refetch 하지 않음 (데이터가 fresh하므로)`}</CodeBlock>
      </section>

      {/* 섹션 3: gcTime */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          gcTime (Garbage Collection Time)
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>gcTime</strong>은 사용하지 않는 쿼리 데이터가 메모리에서
            제거되기까지의 시간입니다. (이전 이름: cacheTime)
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              - <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">gcTime: 1000 * 60 * 5</code> (기본값): 5분 후 가비지 컬렉션
            </li>
            <li>- 쿼리를 사용하는 컴포넌트가 언마운트된 후부터 카운트 시작</li>
            <li>- gcTime이 지나면 캐시에서 완전히 제거됨</li>
          </ul>
        </div>

        <CodeBlock title="gcTime 설정 예시">{`const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  gcTime: 1000 * 60 * 10, // 10분 동안 캐시 유지
});

// 컴포넌트가 언마운트된 후 10분이 지나면
// 캐시 데이터가 메모리에서 제거됨`}</CodeBlock>
      </section>

      {/* 섹션 4: staleTime vs gcTime 비교 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          staleTime vs gcTime 비교
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">
                  구분
                </th>
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">
                  staleTime
                </th>
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left">
                  gcTime
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2 font-semibold">
                  역할
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  데이터 신선도 결정
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  메모리 캐시 유지 시간
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2 font-semibold">
                  기본값
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  0 (즉시 stale)
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  5분
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2 font-semibold">
                  영향
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  백그라운드 refetch 여부
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  캐시 데이터 존재 여부
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2 font-semibold">
                  카운트 시작
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  데이터를 가져온 시점
                </td>
                <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                  쿼리가 사용되지 않는 시점
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 섹션 5: 실습 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          실습: staleTime 비교
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          아래 두 쿼리는 각각 다른 staleTime을 가집니다. Devtools에서 상태 변화를
          확인해보세요.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <StaleTimeDemo staleTime={0} title="staleTime: 0 (기본값)" />
          <StaleTimeDemo staleTime={30000} title="staleTime: 30초" />
        </div>

        <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>확인해보세요:</strong> 브라우저 탭을 전환했다가 다시 돌아오면
            (window focus), staleTime이 0인 쿼리는 refetch되지만, 30초인 쿼리는
            30초 이내라면 refetch되지 않습니다.
          </p>
        </div>
      </section>

      {/* 섹션 6: 타임라인 시각화 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          데이터 생명주기 타임라인
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="space-y-4 font-mono text-sm">
            <div className="flex items-center gap-2">
              <span className="w-24">T=0</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                FRESH
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                데이터 fetch 완료
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-24">T=staleTime</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                STALE
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                데이터가 오래됨 (백그라운드 refetch 가능)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-24">언마운트</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">
                INACTIVE
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                쿼리를 사용하는 컴포넌트 없음
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-24">T=gcTime</span>
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded">
                DELETED
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                캐시에서 제거됨
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 코드 예시 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          권장 설정 예시
        </h2>
        <CodeBlock title="상황별 권장 설정">{`// 자주 변경되는 데이터 (실시간 알림 등)
useQuery({
  queryKey: ['notifications'],
  queryFn: fetchNotifications,
  staleTime: 0,        // 즉시 stale
  gcTime: 1000 * 60,   // 1분
});

// 거의 변경되지 않는 데이터 (사용자 프로필 등)
useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 1000 * 60 * 10,  // 10분
  gcTime: 1000 * 60 * 30,     // 30분
});

// 변경되지 않는 정적 데이터 (국가 목록 등)
useQuery({
  queryKey: ['countries'],
  queryFn: fetchCountries,
  staleTime: Infinity,  // 영원히 fresh
  gcTime: Infinity,     // 영원히 캐시
});`}</CodeBlock>
      </section>
    </ChapterLayout>
  );
}

// staleTime 데모 컴포넌트
function StaleTimeDemo({
  staleTime,
  title,
}: {
  staleTime: number;
  title: string;
}) {
  const [enabled, setEnabled] = useState(true);

  const { data, isLoading, isFetching, dataUpdatedAt, isStale } = useQuery({
    queryKey: ["todos-demo", staleTime],
    queryFn: fetchTodos,
    staleTime,
    enabled,
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h3>

      <div className="flex flex-wrap gap-2 mb-3">
        <span
          className={`px-2 py-1 rounded text-xs ${
            isStale
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {isStale ? "STALE" : "FRESH"}
        </span>
        {isLoading && (
          <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
            로딩 중
          </span>
        )}
        {isFetching && !isLoading && (
          <span className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-800">
            백그라운드 갱신
          </span>
        )}
      </div>

      <div className="mb-3">
        <button
          onClick={() => setEnabled(!enabled)}
          className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
        >
          {enabled ? "쿼리 비활성화" : "쿼리 활성화"}
        </button>
      </div>

      {data && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>데이터 수: {data.length}개</p>
          <p>
            업데이트:{" "}
            {dataUpdatedAt
              ? new Date(dataUpdatedAt).toLocaleTimeString()
              : "-"}
          </p>
        </div>
      )}
    </div>
  );
}
