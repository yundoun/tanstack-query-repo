"use client";

import { ReactNode, useState, useEffect } from "react";

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
}: PracticeGuideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const progress = (completedSteps.length / steps.length) * 100;

  // 키보드 단축키 (Escape로 닫기)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-gray-700 text-white"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        title="실습 가이드 열기/닫기"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <span className="font-medium">실습 가이드</span>
        {completedSteps.length > 0 && (
          <span className="bg-white text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
            {completedSteps.length}/{steps.length}
          </span>
        )}
      </button>

      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 사이드 패널 */}
      <div
        className={`fixed top-0 right-0 h-full w-96 max-w-[90vw] bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 패널 헤더 */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h2 className="font-bold text-lg">{title}</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {description && (
            <p className="text-blue-100 text-sm">{description}</p>
          )}
          {/* 진행률 바 */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-blue-100 mb-1">
              <span>진행률</span>
              <span>{completedSteps.length}/{steps.length} 완료</span>
            </div>
            <div className="w-full bg-blue-400/30 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* 스크롤 가능한 콘텐츠 */}
        <div className="overflow-y-auto h-[calc(100%-200px)] p-4">
          {/* 단계별 가이드 */}
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  completedSteps.includes(index)
                    ? "bg-green-50 dark:bg-green-900/30 border-green-400 dark:border-green-600"
                    : currentStep === index
                    ? "bg-blue-50 dark:bg-blue-900/30 border-blue-400 dark:border-blue-600"
                    : "bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                }`}
                onClick={() => {
                  toggleStep(index);
                  setCurrentStep(index);
                }}
              >
                <div className="flex items-start gap-3">
                  {/* 체크박스/번호 */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                      completedSteps.includes(index)
                        ? "bg-green-500 text-white"
                        : currentStep === index
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {completedSteps.includes(index) ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>

                  {/* 내용 */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold text-sm ${
                      completedSteps.includes(index)
                        ? "text-green-700 dark:text-green-300"
                        : "text-gray-900 dark:text-white"
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                      {step.description}
                    </p>
                    {step.action && (
                      <div className="mt-2 flex items-start gap-1.5">
                        <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium flex-shrink-0">
                          실행
                        </span>
                        <span className="text-xs text-blue-600 dark:text-blue-400">
                          {step.action}
                        </span>
                      </div>
                    )}
                    {step.check && (
                      <div className="mt-1.5 flex items-start gap-1.5">
                        <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs font-medium flex-shrink-0">
                          확인
                        </span>
                        <span className="text-xs text-green-600 dark:text-green-400">
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
            <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 text-sm mb-2 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                실습 팁
              </h4>
              <ul className="space-y-1">
                {tips.map((tip, index) => (
                  <li key={index} className="text-xs text-yellow-700 dark:text-yellow-400 leading-relaxed">
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 패널 푸터 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <button
              onClick={() => setCompletedSteps([])}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              초기화
            </button>
            <button
              onClick={() => setCompletedSteps(steps.map((_, i) => i))}
              className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              모두 완료
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            ESC 키로 닫기 • 클릭하여 완료 체크
          </p>
        </div>
      </div>
    </>
  );
}
