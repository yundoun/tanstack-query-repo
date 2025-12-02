"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ChapterLayoutProps {
  chapterNumber: number;
  title: string;
  children: ReactNode;
}

export default function ChapterLayout({
  chapterNumber,
  title,
  children,
}: ChapterLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 네비게이션 */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              목차로 돌아가기
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Chapter {chapterNumber}
            </span>
          </div>
        </div>
      </nav>

      {/* 콘텐츠 */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 챕터 헤더 */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium">
                Chapter {chapterNumber}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
          </header>

          {/* 챕터 내용 */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
