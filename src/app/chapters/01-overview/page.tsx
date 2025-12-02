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

      {/* 섹션 2: 서버 상태 vs 클라이언트 상태 */}
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
              <li>- 브라우저에서 관리되는 상태</li>
              <li>- 동기적이며 즉시 접근 가능</li>
              <li>- 예: 모달 열림/닫힘, 폼 입력값</li>
              <li>- 관리도구: useState, Redux, Zustand</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-700 dark:text-green-300 mb-3">
              서버 상태 (Server State)
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>- 서버에 저장된 데이터</li>
              <li>- 비동기적이며 네트워크 요청 필요</li>
              <li>- 예: 사용자 목록, 게시글 데이터</li>
              <li>- 관리도구: <strong>TanStack Query</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* 섹션 3: 기존 방식의 문제점 */}
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
            <li>❌ 데이터 동기화가 어려움</li>
            <li>❌ 메모리 누수 위험 (cleanup 처리 필요)</li>
          </ul>
        </div>
      </section>

      {/* 섹션 4: TanStack Query 방식 */}
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
            <li>✅ Devtools 제공</li>
          </ul>
        </div>
      </section>

      {/* 핵심 개념 요약 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          핵심 개념 요약
        </h2>
        <div className="grid gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white">
              Query (조회)
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              서버에서 데이터를 가져오는 작업. useQuery 사용
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white">
              Mutation (변경)
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              서버 데이터를 생성/수정/삭제하는 작업. useMutation 사용
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white">
              Query Key (쿼리 키)
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              각 쿼리를 고유하게 식별하는 키. 캐싱의 기준이 됨
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white">
              Cache (캐시)
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              가져온 데이터를 메모리에 저장하여 재사용
            </p>
          </div>
        </div>
      </section>
    </ChapterLayout>
  );
}
