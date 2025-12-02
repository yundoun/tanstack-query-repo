"use client";

import { ReactNode, useState } from "react";

interface Step {
  title: string;
  description: string;
  action?: string;
  check?: string;
}

interface PracticeGuideProps {
  title: string;
  description?: string;
  steps: Step[];
  tips?: string[];
  children?: ReactNode;
}

export default function PracticeGuide({
  title,
  description,
  steps,
  tips,
  children,
}: PracticeGuideProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const progress = (completedSteps.length / steps.length) * 100;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-blue-200 dark:border-blue-800 my-6">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* 진행률 */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
          <span>진행률</span>
          <span>{completedSteps.length}/{steps.length} 완료</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 단계별 가이드 */}
      <div className="space-y-3 mb-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${
              completedSteps.includes(index)
                ? "bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
            }`}
            onClick={() => toggleStep(index)}
          >
            <div className="flex items-start gap-3">
              {/* 체크박스 */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  completedSteps.includes(index)
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                }`}
              >
                {completedSteps.includes(index) ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>

              {/* 내용 */}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {step.description}
                </p>
                {step.action && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                      실행
                    </span>
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      {step.action}
                    </span>
                  </div>
                )}
                {step.check && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs font-medium">
                      확인
                    </span>
                    <span className="text-sm text-green-600 dark:text-green-400">
                      {step.check}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 팁 */}
      {tips && tips.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            실습 팁
          </h4>
          <ul className="space-y-1">
            {tips.map((tip, index) => (
              <li key={index} className="text-sm text-yellow-700 dark:text-yellow-400">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 추가 컨텐츠 */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
