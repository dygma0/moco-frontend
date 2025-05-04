import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { CSSProperties } from "react";

interface ChatMessageProps {
	isAI: boolean;
	message: string;
	timestamp: string;
}

export function ChatMessage({ isAI, message, timestamp }: ChatMessageProps) {
	return (
		<li className="mb-4 pr-4">
			<article className="flex flex-col">
				<header className="flex items-start mb-1">
					{isAI ? (
						<span
							className="h-8 w-8 rounded-full bg-[#c28b3b] flex items-center justify-center text-white mr-2"
							aria-hidden="true"
						>
							🧙‍♂️
						</span>
					) : (
						<span
							className="h-8 w-8 rounded-full bg-[#f8f3e7] flex items-center justify-center text-[#c28b3b] mr-2"
							aria-hidden="true"
						>
							🦦
						</span>
					)}
					<time className="text-xs text-[#888] mt-2">{timestamp}</time>
				</header>
				<div
					className={`rounded-lg p-4 ml-10 ${isAI ? "bg-black text-white" : "bg-white text-[#333] border border-[#eaeaea]"}`}
				>
					<div
						className={`markdown-content ${isAI ? "markdown-content-dark" : ""}`}
					>
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							components={{
								code({ node, className, children, style: _, ref, ...props }) {
									const match = /language-(\w+)/.exec(className || "");
									return match ? (
										<SyntaxHighlighter
											style={
												isAI
													? (vscDarkPlus as { [key: string]: CSSProperties })
													: (vs as { [key: string]: CSSProperties })
											}
											language={match[1]}
											PreTag="div"
											{...props}
										>
											{String(children).replace(/\n$/, "")}
										</SyntaxHighlighter>
									) : (
										<code className={className} {...props}>
											{children}
										</code>
									);
								},
							}}
						>
							{message}
						</ReactMarkdown>
					</div>
				</div>
			</article>
		</li>
	);
}
