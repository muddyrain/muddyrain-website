import React, { FC } from 'react';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as themes from 'react-syntax-highlighter/dist/cjs/styles/prism';

export type CodeThemesType = { [key: string]: React.CSSProperties };
export const CodeThemes = themes;
export const CodeBlock: FC<CodeProps & { theme: CodeThemesType }> = ({
  node,
  inline,
  className,
  children,
  theme,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || '') || ['', ''];
  return !inline && match ? (
    <SyntaxHighlighter
      {...props}
      showLineNumbers={true}
      style={theme}
      language={match[1]}
      PreTag='div'
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
