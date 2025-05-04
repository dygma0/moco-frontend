import { useEffect, useRef, useState } from "react";
import { LessonContent } from "./LessonContent";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { useChatSession } from "../../api/hooks/useChatSession";

interface UnderstandingCheckProps {
	challengeId: string;
	disabled?: boolean;
}

export function DiscussionChatBox({
	challengeId,
	disabled = false,
}: UnderstandingCheckProps) {
	const [showLesson, setShowLesson] = useState(false);
	const {
		data: chatSession,
		isLoading,
		isError,
		error,
		sendMessage,
		isSending,
	} = useChatSession(challengeId);

	const chatContainerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [chatSession]);

	const handleSkipToLesson = () => {
		setShowLesson(true);
	};

	const handleCloseLesson = () => {
		setShowLesson(false);
	};

	const handleSendMessage = (message: string) => {
		if (chatSession?.remainingInteractions === 0) {
			return;
		}

		sendMessage(message);
	};

	interface ChatMessageData {
		id: string;
		sender: string;
		content: string;
		timestamp: string;
	}

	return (
		<aside
			className="lg:w-2/5 h-[calc(100vh-180px)]"
			aria-labelledby="understanding-check-title"
		>
			{showLesson ? (
				<LessonContent onClose={handleCloseLesson} />
			) : (
				<div className="flex flex-col h-full">
					<header className="p-4 border-b border-[#eaeaea] bg-white">
						<div className="flex items-center justify-between">
							<h2
								id="understanding-check-title"
								className="text-lg font-medium text-[#333]"
							>
								Discussion
							</h2>
							<button
								type="button"
								className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-[#f8f3e7] hover:text-[#a67a2e] active:bg-[#e6d7b8] active:text-[#8a6626] h-9 rounded-md px-3 text-xs text-[#c28b3b]"
								aria-label="Skip to lesson"
								onClick={handleSkipToLesson}
							>
								Skip to Lesson
							</button>
						</div>
						<output className="flex items-center mt-2" aria-live="polite">
							<span
								className={`h-2 w-2 rounded-full ${chatSession?.remainingInteractions ? "bg-green-500" : "bg-red-500"} mr-2`}
								aria-hidden="true"
							/>
							<span className="text-xs text-[#666]">
								Questions remaining: {chatSession?.remainingInteractions ?? 0}
							</span>
						</output>
					</header>

					<section
						ref={chatContainerRef}
						className="flex-1 overflow-y-auto p-4 bg-[#f8f8f6]"
						aria-label="Chat conversation"
					>
						{isLoading && (
							<div className="flex justify-center items-center h-full">
								<p className="text-gray-500">Loading chat messages...</p>
							</div>
						)}

						{isError && (
							<div className="flex justify-center items-center h-full">
								<p className="text-red-500">
									Error loading chat messages. Please try again later.
								</p>
								<p className="text-sm text-gray-500 mt-2">
									{error instanceof Error ? error.message : "Unknown error"}
								</p>
							</div>
						)}

						{!isLoading && !isError && chatSession && (
							<ol className="list-none p-0 m-0 space-y-4">
								{(chatSession.messages as ChatMessageData[]).map((message) => (
									<ChatMessage
										key={message.id ?? message.timestamp}
										isAI={message.sender === "system"}
										message={message.content}
										timestamp={new Date(message.timestamp).toLocaleTimeString(
											[],
											{
												hour: "2-digit",
												minute: "2-digit",
											},
										)}
									/>
								))}
							</ol>
						)}
					</section>

					<footer className="p-4 border-t border-[#eaeaea] bg-white">
						<ChatInput
							onSendMessage={handleSendMessage}
							disabled={
								disabled ||
								isSending ||
								chatSession?.remainingInteractions === 0
							}
							placeholder={
								chatSession?.remainingInteractions === 0
									? "No more questions remaining"
									: "Type your message here..."
							}
						/>
					</footer>
				</div>
			)}
		</aside>
	);
}
