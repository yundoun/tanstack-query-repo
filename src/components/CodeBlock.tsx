"use client";

import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({
  children,
  language = "tsx",
  title,
}: CodeBlockProps) {
  // 제목에서 언어 추론
  const inferredLanguage = title?.includes(".tsx")
    ? "tsx"
    : title?.includes(".ts")
    ? "typescript"
    : title?.includes(".json")
    ? "json"
    : title?.includes("bash") || title?.includes("npm") || title?.includes("yarn") || title?.includes("pnpm")
    ? "bash"
    : language;

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {title && (
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
          <span className="text-sm font-mono text-gray-300">{title}</span>
          <span className="text-xs text-gray-500 uppercase">{inferredLanguage}</span>
        </div>
      )}
      <Highlight theme={themes.nightOwl} code={children.trim()} language={inferredLanguage}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} p-4 overflow-x-auto text-sm`}
            style={{ ...style, margin: 0 }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="table-row">
                <span className="table-cell pr-4 text-gray-500 select-none text-right w-8">
                  {i + 1}
                </span>
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
