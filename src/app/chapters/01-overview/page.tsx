"use client";

import ChapterLayout from "@/components/ChapterLayout";
import CodeBlock from "@/components/CodeBlock";

export default function OverviewPage() {
  return (
    <ChapterLayout chapterNumber={1} title="개요">
      {/* 섹션 1: TanStack Query란? */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          TanStack Query란?
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>TanStack Query</strong>(이전 이름: React Query)는{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              서버 상태(Server State)
            </span>
            를 관리하기 위한 라이브러리입니다.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            데이터 페칭, 캐싱, 동기화, 업데이트를 쉽고 선언적으로 처리할 수 있게
            해줍니다.
          </p>
        </div>
      </section>

      {/* 섹션 2: 핵심 개념 이해하기 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          핵심 개념 이해하기
        </h2>

        {/* 서버 상태와 캐시 정의 */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">
            🎯 먼저 이것만 기억하세요
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">
                서버 상태 (Server State)
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                서버 DB에 있는 <strong>원본 데이터</strong>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                예: 사용자 목록, 게시글, 주문 내역 등
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-green-500">
              <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">
                캐시 (Cache)
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                서버 데이터를 <strong>브라우저 메모리에 복사</strong>해둔 것
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                네트워크 요청 없이 즉시 화면에 표시 가능
              </p>
            </div>
          </div>
        </div>

        {/* 데이터 흐름 다이어그램 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">
            📊 데이터 흐름 다이어그램
          </h3>

          {/* 다이어그램 */}
          <div className="overflow-x-auto">
            <div className="flex items-center justify-center gap-2 md:gap-4 min-w-[600px] py-4">
              {/* 서버 DB */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-24 bg-blue-100 dark:bg-blue-900/50 border-2 border-blue-500 rounded-lg flex flex-col items-center justify-center">
                  <div className="text-2xl mb-1">🗄️</div>
                  <div className="font-bold text-blue-700 dark:text-blue-300 text-sm">
                    서버 DB
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    원본 데이터
                  </div>
                </div>
              </div>

              {/* 화살표 1: fetch */}
              <div className="flex flex-col items-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  fetch
                </div>
                <div className="flex items-center">
                  <div className="w-8 md:w-16 h-0.5 bg-blue-500"></div>
                  <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-blue-500"></div>
                </div>
              </div>

              {/* 브라우저 메모리 (캐시) */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-24 bg-green-100 dark:bg-green-900/50 border-2 border-green-500 rounded-lg flex flex-col items-center justify-center relative">
                  <div className="absolute -top-3 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                    TanStack Query
                  </div>
                  <div className="text-2xl mb-1">💾</div>
                  <div className="font-bold text-green-700 dark:text-green-300 text-sm">
                    브라우저 메모리
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    캐시 (복사본)
                  </div>
                </div>
              </div>

              {/* 화살표 2: 구독 */}
              <div className="flex flex-col items-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  구독
                </div>
                <div className="flex items-center">
                  <div className="w-8 md:w-16 h-0.5 bg-green-500"></div>
                  <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-green-500"></div>
                </div>
              </div>

              {/* 컴포넌트 */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-24 bg-purple-100 dark:bg-purple-900/50 border-2 border-purple-500 rounded-lg flex flex-col items-center justify-center">
                  <div className="text-2xl mb-1">⚛️</div>
                  <div className="font-bold text-purple-700 dark:text-purple-300 text-sm">
                    컴포넌트
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    화면 렌더링
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 흐름 설명 */}
          <div className="mt-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">
                  1
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  서버 DB에서 데이터를 <strong>fetch</strong>해옵니다
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">
                  2
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  TanStack Query가 브라우저 메모리에 <strong>캐싱</strong>합니다
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">
                  3
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  컴포넌트가 캐시를 <strong>구독</strong>하여 화면에 렌더링합니다
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TanStack Query가 하는 일 */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
          <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-4 text-lg">
            ⚡ TanStack Query가 하는 일
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            TanStack Query는 이 <strong>캐시를 똑똑하게 관리</strong>해주는 라이브러리입니다.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-500">✓</span>
              <span>언제 다시 fetch할지 결정 (staleTime)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-500">✓</span>
              <span>언제까지 캐시를 유지할지 결정 (gcTime)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-500">✓</span>
              <span>백그라운드에서 자동 갱신</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-500">✓</span>
              <span>여러 컴포넌트가 같은 데이터 공유</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-500">✓</span>
              <span>로딩/에러 상태 자동 관리</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-500">✓</span>
              <span>메모리 자동 정리 (가비지 컬렉션)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 3: 서버 상태 관리란? */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          &quot;서버 상태 관리&quot;란?
        </h2>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
          <blockquote className="text-lg text-gray-800 dark:text-gray-200 font-medium mb-4 border-l-4 border-indigo-500 pl-4">
            &quot;서버에 있는 데이터를 가져와서,
            <br />
            브라우저에 캐싱하고,
            <br />
            최신 상태로 동기화하는 것&quot;
          </blockquote>
          <p className="text-gray-600 dark:text-gray-400">
            💡 <strong>Tip:</strong> &quot;서버 상태&quot;라는 말이 처음엔 헷갈릴 수 있는데,{" "}
            <strong>&quot;서버에서 온 데이터&quot;</strong>라고 이해하면 됩니다.
          </p>
        </div>
      </section>

      {/* 섹션 4: 서버 상태 vs 클라이언트 상태 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          서버 상태 vs 클라이언트 상태
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-3">
              클라이언트 상태 (Client State)
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• 브라우저에서만 존재하는 상태</li>
              <li>• 동기적이며 즉시 접근 가능</li>
              <li>• 예: 모달 열림/닫힘, 폼 입력값, 다크모드</li>
              <li>
                • 관리도구: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">useState</code>,{" "}
                <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">Redux</code>,{" "}
                <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">Zustand</code>
              </li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-700 dark:text-green-300 mb-3">
              서버 상태 (Server State)
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• 서버 DB에 저장된 데이터</li>
              <li>• 비동기적이며 네트워크 요청 필요</li>
              <li>• 예: 사용자 목록, 게시글, 댓글</li>
              <li>
                • 관리도구:{" "}
                <code className="bg-green-100 dark:bg-green-800 px-1 rounded font-bold">
                  TanStack Query
                </code>
              </li>
            </ul>
          </div>
        </div>

        {/* 핵심 차이점 */}
        <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            💡 핵심 차이점
          </h4>
          <p className="text-gray-700 dark:text-gray-300">
            클라이언트 상태는 <strong>내가 소유</strong>하고 완전히 제어할 수 있지만,
            서버 상태는 <strong>다른 곳(서버)에 존재</strong>하기 때문에
            최신 상태인지 확인하고 동기화해야 합니다.
          </p>
        </div>
      </section>

      {/* 섹션 5: 기존 방식의 문제점 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          기존 방식의 문제점
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          useEffect + useState로 데이터를 가져오는 전통적인 방식:
        </p>
        <CodeBlock title="기존 방식 (useEffect + useState)">{`function PostList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생!</div>;

  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}`}</CodeBlock>

        <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-6 border border-red-200 dark:border-red-800 mt-4">
          <h3 className="font-bold text-red-700 dark:text-red-300 mb-3">
            이 방식의 문제점
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>❌ 매번 보일러플레이트 코드를 작성해야 함</li>
            <li>❌ 캐싱이 없어 같은 데이터를 반복 요청</li>
            <li>❌ 로딩/에러 상태를 수동으로 관리</li>
            <li>❌ 데이터 동기화가 어려움 (다른 탭에서 변경되면?)</li>
            <li>❌ 컴포넌트 간 데이터 공유 어려움</li>
            <li>❌ 메모리 누수 위험 (cleanup 처리 필요)</li>
          </ul>
        </div>
      </section>

      {/* 섹션 6: TanStack Query 방식 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          TanStack Query 방식
        </h2>
        <CodeBlock title="TanStack Query 사용">{`import { useQuery } from '@tanstack/react-query';

function PostList() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then(res => res.json()),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생!</div>;

  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}`}</CodeBlock>

        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 border border-green-200 dark:border-green-800 mt-4">
          <h3 className="font-bold text-green-700 dark:text-green-300 mb-3">
            TanStack Query의 장점
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>✅ 간결한 코드 (보일러플레이트 제거)</li>
            <li>✅ 자동 캐싱 및 재사용</li>
            <li>✅ 자동 로딩/에러 상태 관리</li>
            <li>✅ 백그라운드 데이터 갱신</li>
            <li>✅ 자동 가비지 컬렉션</li>
            <li>✅ 윈도우 포커스시 자동 refetch</li>
            <li>✅ 페이지네이션, 무한스크롤 지원</li>
            <li>✅ DevTools 제공</li>
          </ul>
        </div>
      </section>

      {/* 핵심 개념 요약 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          핵심 용어 정리
        </h2>
        <div className="grid gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white">
              Query (쿼리)
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              서버에서 데이터를 <strong>읽어오는</strong> 작업. <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">useQuery</code> 사용
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white">
              Mutation (뮤테이션)
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              서버 데이터를 <strong>생성/수정/삭제</strong>하는 작업. <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">useMutation</code> 사용
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white">
              Query Key (쿼리 키)
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              각 쿼리를 <strong>고유하게 식별</strong>하는 키. 캐시 저장과 조회의 기준이 됨
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white">
              staleTime (신선 시간)
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              캐시된 데이터가 <strong>신선(fresh)하다고 간주</strong>되는 시간. 이 시간 동안은 재요청하지 않음
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white">
              gcTime (가비지 컬렉션 시간)
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              사용되지 않는 캐시가 <strong>메모리에서 제거</strong>되기까지의 시간
            </p>
          </div>
        </div>
      </section>

      {/* 다음 단계 안내 */}
      <section className="mb-12">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
          <h3 className="font-bold text-indigo-700 dark:text-indigo-300 mb-3">
            🚀 다음 단계
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            이제 TanStack Query가 무엇인지 알았으니, 다음 챕터에서{" "}
            <strong>데이터 캐싱</strong>이 어떻게 동작하는지 자세히 알아보겠습니다.
          </p>
        </div>
      </section>
    </ChapterLayout>
  );
}
