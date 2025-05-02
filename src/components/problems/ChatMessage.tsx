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
							AI
						</span>
					) : (
						<span
							className="h-8 w-8 rounded-full bg-[#f8f3e7] flex items-center justify-center text-[#c28b3b] mr-2"
							aria-hidden="true"
						>
							You
						</span>
					)}
					<time className="text-xs text-[#888] mt-2">{timestamp}</time>
				</header>
				<div
					className={`rounded-lg p-4 ml-10 ${isAI ? "bg-black text-white" : "bg-white text-[#333] border border-[#eaeaea]"}`}
				>
					<p className="text-sm">{message}</p>
				</div>
			</article>
		</li>
	);
}
