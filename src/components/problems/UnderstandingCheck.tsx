import { useState } from "react";
import { LessonContent } from "./LessonContent";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

// Sample chat messages for demonstration
const initialMessages = [
	{
		id: 1,
		isAI: true,
		message:
			"주어진 2D 행렬에 대해서 설명에서 오른쪽으로 위에서 아래로 누적 합을 구한 결과 지점별 배열을 추가로 구성한 뒤 특정 구간의 사각형 내부의 합을 O(1)으로 구할 수 있을 것 같습니다.",
		timestamp: "12:44 AM",
	},
];

interface UnderstandingCheckProps {
	disabled?: boolean;
}

export function UnderstandingCheck({ disabled = false }: UnderstandingCheckProps) {
	const [showLesson, setShowLesson] = useState(false);
	const [messages, setMessages] = useState(initialMessages);

	const handleSkipToLesson = () => {
		setShowLesson(true);
	};

	const handleCloseLesson = () => {
		setShowLesson(false);
	};

	const handleSendMessage = (message: string) => {
		// Add user message
		const userMessage = {
			id: messages.length + 1,
			isAI: false,
			message,
			timestamp: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
		};

		setMessages([...messages, userMessage]);

		// In a real app, you would send the message to an API and get a response
		// For now, we'll just simulate an AI response after a short delay
		setTimeout(() => {
			const aiMessage = {
				id: messages.length + 2,
				isAI: true,
				message:
					"이 접근 방식이 맞습니다. 2D 누적 합(prefix sum)을 미리 계산해두면 sumRegion 쿼리를 O(1) 시간에 처리할 수 있습니다.",
				timestamp: new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
			};
			setMessages((prev) => [...prev, aiMessage]);
		}, 1000);
	};

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
								className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-[#f8f3e7] hover:text-[#a67a2e] active:bg-[#e6d7b8] active:text-[#8a6626] h-9 rounded-md px-3 text-xs text-[#c28b3b]"
								aria-label="Skip to lesson"
								onClick={handleSkipToLesson}
							>
								Skip to Lesson
							</button>
						</div>
						<div
							className="flex items-center mt-2"
							aria-live="polite"
							role="status"
						>
							<span
								className="h-2 w-2 rounded-full bg-green-500 mr-2"
								aria-hidden="true"
							></span>
							<span className="text-xs text-[#666]">
								Questions remaining: 1
							</span>
						</div>
					</header>

					<section
						className="flex-1 overflow-y-auto p-4 bg-[#f8f8f6]"
						aria-label="Chat conversation"
					>
						<ol className="list-none p-0 m-0 space-y-4">
							{messages.map((message) => (
								<ChatMessage
									key={message.id}
									isAI={message.isAI}
									message={message.message}
									timestamp={message.timestamp}
								/>
							))}
						</ol>
					</section>

					<footer className="p-4 border-t border-[#eaeaea] bg-white">
						<ChatInput onSendMessage={handleSendMessage} disabled={disabled} />
					</footer>
				</div>
			)}
		</aside>
	);
}
