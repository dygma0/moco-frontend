import React, { useState } from "react";
import { Icon } from "../ui/Icon";

interface ChatInputProps {
	onSendMessage: (message: string) => void;
	placeholder?: string;
}

export function ChatInput({
	onSendMessage,
	placeholder = "Type your message here...",
}: ChatInputProps) {
	const [message, setMessage] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (message.trim()) {
			onSendMessage(message);
			setMessage("");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		// Submit on Ctrl+Enter or Cmd+Enter
		if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
			handleSubmit(e);
		}
	};

	return (
		<form
			className="flex items-center"
			onSubmit={handleSubmit}
			aria-label="Chat message form"
		>
			<label htmlFor="message-input" className="sr-only">
				Type your message
			</label>
			<textarea
				id="message-input"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				className="flex-1 resize-none border border-[#e0e0e0] rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-[#c28b3b] focus:border-[#c28b3b] min-h-[60px]"
				aria-label="Type your message"
			></textarea>
			<button
				type="submit"
				className="gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground ml-2 h-10 w-10 rounded-full bg-[#c28b3b] hover:bg-[#a67a2e] active:bg-[#8a6626] p-0 flex items-center justify-center"
				aria-label="Send message"
				disabled={!message.trim()}
			>
				<Icon id="send" title="Send message" className="h-5 w-5 text-white">
					<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
					<path d="m21.854 2.147-10.94 10.939"></path>
				</Icon>
			</button>
		</form>
	);
}
