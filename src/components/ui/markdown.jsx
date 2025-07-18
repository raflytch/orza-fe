"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Markdown({ content, className = "" }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className={`prose prose-sm max-w-none ${className}`}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-2xl font-bold mb-4 text-gray-800" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-xl font-semibold mb-3 text-gray-700" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-lg font-medium mb-2 text-gray-600" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="mb-3 text-gray-700 leading-relaxed" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside mb-3 space-y-1" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />
        ),
        li: ({ node, ...props }) => <li className="text-gray-700" {...props} />,
        strong: ({ node, ...props }) => (
          <strong className="font-semibold text-gray-800" {...props} />
        ),
        em: ({ node, ...props }) => (
          <em className="italic text-gray-600" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-green-500 pl-4 italic bg-green-50 py-2 rounded-r-lg"
            {...props}
          />
        ),
        code: ({ node, inline, ...props }) => {
          const text = props.children;
          if (inline) {
            return (
              <code
                className="bg-gray-100 px-2 py-1 rounded text-sm font-mono"
                {...props}
              />
            );
          }
          return (
            <code
              className="block bg-gray-100 p-3 rounded-lg text-sm font-mono overflow-x-auto"
              {...props}
            />
          );
        },
        text: ({ node, ...props }) => {
          const text = props.children;
          if (typeof text === "string") {
            return text.replace(/\*\*/g, "");
          }
          return text;
        },
      }}
    >
      {content?.replace(/\*\*/g, "") || ""}
    </ReactMarkdown>
  );
}
