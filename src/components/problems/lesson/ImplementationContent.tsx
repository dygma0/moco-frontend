import { useState } from "react";
import { type LessonImplementationSection } from "../../../api/challenges";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";

interface ImplementationContentProps {
	section: LessonImplementationSection;
}

export function ImplementationContent({ section }: ImplementationContentProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const sortedSteps = [...section.data.codeSteps].sort(
		(a, b) => a.order - b.order,
	);
	const currentStepData = sortedSteps[currentStep];

	const handleNextStep = () => {
		if (currentStep < sortedSteps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const stepTitle = currentStepData.explanation
		.split("\n")[0]
		.replace(/^#+\s*/, "");
	const stepDescription = currentStepData.explanation
		.split("\n")
		.slice(1)
		.join("\n");

	// 단계 진행 완료도를 퍼센트로 계산
	const progressPercentage = ((currentStep + 1) / sortedSteps.length) * 100;

	return (
		<div className="space-y-6">
			<h2 className="text-xl font-medium text-[#333] mb-6">{section.title}</h2>

			<div className="bg-[#f8f8f6] p-4 rounded-lg mb-4">
				<h3 className="text-lg font-medium text-[#333] mb-2">
					{section.data.title}
				</h3>
				<p className="text-[#666] text-base mb-2">{section.data.description}</p>
			</div>

			{/* 단계 진행 표시기 */}
			<div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
				<div
					className="absolute top-0 left-0 h-full bg-[#c28b3b] transition-all duration-300 ease-in-out"
					style={{ width: `${progressPercentage}%` }}
					aria-hidden="true"
				/>
			</div>

			<div className="flex items-center justify-end mb-4 text-sm">
				<div className="flex space-x-2">
					<button
						type="button"
						className="px-3 py-1 rounded-md border border-[#e0e0e0] hover:bg-[#f8f3e7] disabled:opacity-50 disabled:hover:bg-white transition-colors"
						onClick={handlePrevStep}
						disabled={currentStep === 0}
						aria-label="이전 단계"
					>
						이전
					</button>
					<button
						type="button"
						className="px-3 py-1 bg-[#c28b3b] text-white rounded-md hover:bg-[#a67a2e] disabled:opacity-50 disabled:hover:bg-[#c28b3b] transition-colors"
						onClick={handleNextStep}
						disabled={currentStep === sortedSteps.length - 1}
						aria-label="다음 단계"
					>
						다음
					</button>
				</div>
			</div>

			<div className="flex flex-col space-y-4">
				{/* 설명 섹션 */}
				<div className="bg-[#f8f3e7] rounded-lg overflow-hidden border border-[#e6d7b8]">
					<div className="bg-[#e6d7b8] px-3 py-2 text-[#8a6626] font-medium flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="mr-2"
						>
							<title>설명</title>
							<circle cx="12" cy="12" r="10" />
							<path d="M12 16v-4" />
							<path d="M12 8h.01" />
						</svg>
						설명
					</div>
					<div className="p-4">
						<div className="markdown-content text-[#666] text-base">
							<p className="text-[#666] text-base leading-relaxed">
								<ReactMarkdown>{stepTitle}</ReactMarkdown>
							</p>
						</div>
					</div>
				</div>

				{/* 코드 섹션 */}
				<div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
					<div className="bg-[#2d2d2d] text-white p-3 flex items-center justify-between">
						<div className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="mr-2"
							>
								<title>코드</title>
								<polyline points="16 18 22 12 16 6" />
								<polyline points="8 6 2 12 8 18" />
							</svg>
							코드
						</div>
						<div className="text-xs text-gray-400">
							단계 {currentStep + 1}/{sortedSteps.length}
						</div>
					</div>
					<SyntaxHighlighter
						language="javascript"
						style={vscDarkPlus}
						customStyle={{
							margin: 0,
							padding: "1rem",
							maxHeight: "400px",
							overflow: "auto",
						}}
						showLineNumbers={true}
						wrapLines={true}
						lineProps={(lineNumber) => {
							const highlightLines = currentStepData.highlightLines || [];
							const match = highlightLines.includes(lineNumber);
							return {
								style: {
									display: "block",
									backgroundColor: match
										? "rgba(194, 139, 59, 0.1)"
										: "transparent",
									borderLeft: match ? "3px solid #c28b3b" : "none",
									paddingLeft: match ? "0.5rem" : "0.7rem",
									transition: "all 0.2s ease-in-out",
								},
							};
						}}
					>
						{currentStepData.code}
					</SyntaxHighlighter>
				</div>
			</div>

			{/* 연결 도표 섹션 - 특정 단계에서만 표시할 수 있음 */}
			{currentStepData.diagram && (
				<div className="bg-white rounded-lg overflow-hidden border border-gray-200 p-4 mt-4">
					<h4 className="text-md font-medium text-[#333] mb-2">연결 도표</h4>
					<div className="p-2 bg-[#f8f8f6] rounded border border-gray-200">
						<pre className="text-xs text-[#666] whitespace-pre-wrap overflow-auto max-h-40">
							{currentStepData.diagram}
						</pre>
					</div>
				</div>
			)}
		</div>
	);
}
