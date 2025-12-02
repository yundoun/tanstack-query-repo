import Link from "next/link";

const chapters = [
  {
    id: "01-overview",
    number: 1,
    title: "개요",
    description: "TanStack Query란 무엇이고 왜 필요한가?",
  },
  {
    id: "02-caching",
    number: 2,
    title: "데이터 캐싱",
    description: "캐싱의 개념과 TanStack Query의 캐시 동작 방식",
  },
  {
    id: "03-freshness",
    number: 3,
    title: "데이터의 신선도",
    description: "staleTime과 gcTime, fresh vs stale 상태",
  },
  {
    id: "04-setup",
    number: 4,
    title: "설치 및 구성",
    description: "설치, QueryClient, QueryClientProvider 설정",
  },
  {
    id: "05-usequery",
    number: 5,
    title: "useQuery",
    description: "queryKey, queryFn, select, placeholderData, structuralSharing, meta",
  },
  {
    id: "06-useinfinitequery",
    number: 6,
    title: "useInfiniteQuery",
    description: "무한 스크롤 구현하기",
  },
  {
    id: "07-usemutation",
    number: 7,
    title: "useMutation",
    description: "데이터 생성, 수정, 삭제하기",
  },
  {
    id: "08-devtools",
    number: 8,
    title: "개발자 도구",
    description: "React Query Devtools 사용법",
  },
  {
    id: "09-nextjs",
    number: 9,
    title: "with Next.js",
    description: "App Router에서 사용하기, SSR/Hydration",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* 헤더 */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            TanStack Query 학습
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            서버 상태 관리의 새로운 패러다임을 배워보세요.
            <br />
            실습을 통해 TanStack Query의 모든 핵심 개념을 익힐 수 있습니다.
          </p>
        </header>

        {/* 챕터 목록 */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            {chapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/chapters/${chapter.id}`}
                className="group block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-300">
                      {chapter.number}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {chapter.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {chapter.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 푸터 */}
        <footer className="text-center mt-16 text-gray-500 dark:text-gray-400">
          <p>
            Built with Next.js + TanStack Query v5
          </p>
        </footer>
      </div>
    </div>
  );
}
