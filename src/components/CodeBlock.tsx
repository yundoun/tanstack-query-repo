"use client";

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ children, title }: CodeBlockProps) {
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {title && (
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
            {title}
          </span>
        </div>
      )}
      <pre className="bg-gray-900 p-4 overflow-x-auto">
        <code className="text-sm text-gray-100 font-mono whitespace-pre">
          {children}
        </code>
      </pre>
    </div>
  );
}
