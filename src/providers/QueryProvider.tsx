"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useState를 사용하여 QueryClient를 생성하면
  // 각 요청마다 새로운 클라이언트가 생성되는 것을 방지합니다
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 기본 staleTime: 데이터가 'fresh'로 유지되는 시간 (ms)
            staleTime: 60 * 1000, // 1분
            // gcTime: 사용하지 않는 데이터가 캐시에서 제거되기까지의 시간
            gcTime: 5 * 60 * 1000, // 5분
            // 윈도우 포커스시 자동 refetch
            refetchOnWindowFocus: false,
            // 재시도 횟수
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 개발 환경에서만 DevTools 표시 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
