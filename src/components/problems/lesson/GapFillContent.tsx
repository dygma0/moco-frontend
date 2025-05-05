import { useState } from "react";
import type { LessonGapFillSection } from "../../../api/challenges";

interface GapFillContentProps {
	section: LessonGapFillSection;
}

export function GapFillContent({ section }: GapFillContentProps) {
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const isCorrect = selectedOption === section.data.correctOptionIndex;

	const handleOptionSelect = (index: number) => {
		if (!isSubmitted) {
			setSelectedOption(index);
			setIsSubmitted(true);
		}
	};

	return (
		<div className="space-y-8">
			<h2 className="text-xl font-medium text-[#333] mb-8">{section.title}</h2>

			<div className="bg-[#f8f8f6] p-4 rounded-lg mb-4 text-[#666] text-base">
				{section.data.displayTokens.map((token, index) =>
					token.isBlank ? (
						<span
							key={`${token.text}-${index}`}
							className={`px-3 py-1 mx-1 min-w-16 inline-block text-center transition-all duration-200 ease-in-out ${
								selectedOption !== null
									? isCorrect
										? "border-b-2 border-green-500 bg-green-50"
										: "border-b-2 border-red-400 bg-red-50"
									: "border-b-2 border-dashed border-[#c28b3b]"
							}`}
						>
							{selectedOption !== null
								? section.data.choices[selectedOption].text
								: ""}
							&nbsp;
						</span>
					) : (
						<span key={`${token.text}-${index}`}>{token.text}&nbsp;</span>
					),
				)}
			</div>

			<div
				role="radiogroup"
				aria-required="false"
				dir="ltr"
				className="grid gap-3 space-y-0 mt-8 bg-white rounded-lg"
				tabIndex={-1}
				style={{ outline: "none" }}
				data-disabled={isSubmitted ? "" : undefined}
			>
				{section.data.choices.map((choice, index) => (
					<div
						key={index}
						className={`flex items-center space-x-2 p-3 rounded-md border transition-all duration-200 ease-in-out ${
							isSubmitted
								? index === section.data.correctOptionIndex
									? "border-green-400 bg-green-50"
									: selectedOption === index
										? "border-red-400 bg-red-50"
										: "border-gray-200 hover:border-gray-300"
								: selectedOption === index
									? "border-[#c28b3b] bg-[#fff8e6]"
									: "border-gray-200 hover:border-[#e6d7b8] hover:bg-[#fffdf8]"
						}`}
					>
						<button
							type="button"
							role="radio"
							aria-checked={selectedOption === index}
							data-state={selectedOption === index ? "checked" : "unchecked"}
							value={index.toString()}
							className={`aspect-square h-5 w-5 rounded-full border transition-all duration-200 ease-in-out ${
								isSubmitted
									? index === section.data.correctOptionIndex
										? "border-green-500 bg-green-100"
										: selectedOption === index
											? "border-red-500 bg-red-100"
											: "border-gray-300"
									: selectedOption === index
										? "border-[#c28b3b] bg-[#fff8e6]"
										: "border-gray-300 hover:border-[#c28b3b]"
							} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c28b3b] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80`}
							id={`option-${section.title}-${index}`}
							tabIndex={selectedOption === index ? 0 : -1}
							data-radix-collection-item=""
							data-disabled={isSubmitted ? "" : undefined}
							disabled={isSubmitted}
							onClick={() => handleOptionSelect(index)}
						>
							{selectedOption === index && (
								<span
									data-state="checked"
									data-disabled={isSubmitted ? "" : undefined}
									className="flex items-center justify-center"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke={
											isSubmitted
												? index === section.data.correctOptionIndex
													? "#16a34a"
													: "#ef4444"
												: "#c28b3b"
										}
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="lucide lucide-circle h-3 w-3 fill-current"
									/>
								</span>
							)}
						</button>
						<label
							className={`text-base font-medium leading-none flex-grow cursor-pointer transition-all duration-200 ease-in-out ${
								isSubmitted
									? index === section.data.correctOptionIndex
										? "text-green-700"
										: selectedOption === index
											? "text-red-700"
											: "text-[#666]"
									: "text-[#666] hover:text-[#c28b3b]"
							}`}
							htmlFor={`option-${section.title}-${index}`}
						>
							{choice.text}
						</label>
						{isSubmitted && (
							<span
								className={`flex items-center justify-center w-5 h-5 rounded-full transition-all duration-200 ease-in-out ${
									index === section.data.correctOptionIndex
										? "bg-green-100 text-green-600"
										: selectedOption === index
											? "bg-red-100 text-red-600"
											: ""
								}`}
								aria-hidden="true"
							>
								{index === section.data.correctOptionIndex
									? "✓"
									: selectedOption === index
										? "✗"
										: ""}
							</span>
						)}
					</div>
				))}
			</div>

			{isSubmitted && (
				<div
					className={`mt-6 p-5 rounded-lg transition-all duration-300 ease-in-out ${
						isCorrect
							? "bg-gradient-to-r from-green-50 to-green-100 border border-green-200"
							: "bg-gradient-to-r from-red-50 to-red-100 border border-red-200"
					}`}
				>
					<div className="flex items-center mb-3">
						<span
							className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-2 ${
								isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
							}`}
						>
							{isCorrect ? "✓" : "✗"}
						</span>
						<p
							className={`font-medium text-lg ${isCorrect ? "text-green-700" : "text-red-700"}`}
						>
							{isCorrect ? "대단해요!" : "아깝네요!"}
						</p>
					</div>
					<div className="pl-8">
						<p className="text-[#666] text-base">
							<span className="font-medium">정답:</span>{" "}
							{section.data.choices[section.data.correctOptionIndex].text}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
