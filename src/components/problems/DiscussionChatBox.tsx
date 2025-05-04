import { useEffect, useRef, useState } from "react";
import { LessonContent } from "./LessonContent";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { useChatSession } from "../../api/hooks/useChatSession";

function LoadingMessage() {
	const timestamp = new Date().toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<li className="mb-4 pr-4">
			<article className="flex flex-col">
				<header className="flex items-start mb-1">
					<span
						className="h-8 w-8 rounded-full bg-[#c28b3b] flex items-center justify-center text-white mr-2"
						aria-hidden="true"
					>
						🧙‍♂️
					</span>
					<time className="text-xs text-[#888] mt-2">{timestamp}</time>
				</header>
				<div className="rounded-lg p-4 ml-10">
					<div className="flex items-start p-2">
						<div className="flex space-x-1">
							<div
								className="w-2 h-2 bg-[#c28b3b] rounded-full animate-bounce"
								style={{ animationDelay: "0ms" }}
							/>
							<div
								className="w-2 h-2 bg-[#c28b3b] rounded-full animate-bounce"
								style={{ animationDelay: "150ms" }}
							/>
							<div
								className="w-2 h-2 bg-[#c28b3b] rounded-full animate-bounce"
								style={{ animationDelay: "300ms" }}
							/>
						</div>
					</div>
				</div>
			</article>
		</li>
	);
}

interface UnderstandingCheckProps {
	challengeId: string;
	disabled?: boolean;
}

interface ChatMessageData {
	id: string;
	sender: string;
	content: string;
	timestamp: string;
}

export function DiscussionChatBox({
	challengeId,
	disabled = false,
}: UnderstandingCheckProps) {
	const [showLesson, setShowLesson] = useState(false);
	const [pendingUserMessage, setPendingUserMessage] =
		useState<ChatMessageData | null>(null);

	const {
		data: chatSession,
		isLoading,
		isError,
		error,
		sendMessage,
		isSending,
	} = useChatSession(challengeId);

	const chatContainerRef = useRef<HTMLElement>(null);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [chatSession?.messages.length, isSending]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if (pendingUserMessage && chatSession?.messages) {
			const messageExists = chatSession.messages.some(
				(msg) =>
					msg.content === pendingUserMessage.content &&
					msg.sender === pendingUserMessage.sender,
			);

			if (messageExists) {
				setPendingUserMessage(null);
			}
		}
	}, [chatSession?.messages, pendingUserMessage]);

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

		const tempUserMessage: ChatMessageData = {
			id: `pending-${Date.now()}`,
			sender: "user",
			content: message,
			timestamp: new Date().toISOString(),
		};

		setPendingUserMessage(tempUserMessage);

		sendMessage(message);
	};

	return (
		<aside
			className="lg:w-2/5 h-[calc(100vh-180px)]"
			aria-labelledby="understanding-check-title"
		>
			{showLesson ? (
				<LessonContent onClose={handleCloseLesson} challengeId={challengeId} />
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
								{pendingUserMessage &&
									!chatSession.messages.some(
										(msg) =>
											msg.content === pendingUserMessage.content &&
											msg.sender === pendingUserMessage.sender,
									) && (
										<ChatMessage
											key={pendingUserMessage.id}
											isAI={false}
											message={pendingUserMessage.content}
											timestamp={new Date(
												pendingUserMessage.timestamp,
											).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											})}
										/>
									)}
								{isSending && <LoadingMessage key="loading-indicator" />}
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
									? "남은 대화 횟수가 없습니다. 문제 해결이 어렵다면 학습하기 페이지로 이동해 주세요."
									: "요구사항을 분석하고 접근 방식에 대해 물어보세요."
							}
						/>
					</footer>
				</div>
			)}
		</aside>
	);
}
