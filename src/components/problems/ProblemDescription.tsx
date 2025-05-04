import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Icon } from "../ui/Icon";
import { Badge } from "../ui/Badge";
import type { ProblemDetail } from "./types";
import { ProblemExample } from "./ProblemExample";
import { ProblemListSection, ProblemSection } from "./ProblemSection";
import searchOtter from "../../assets/search-otter.png";
import type { CSSProperties } from "react";

interface ProblemDescriptionProps {
	problem?: ProblemDetail;
}

function ProblemNotFound() {
	const headingId = "problem-not-found-heading";

	return (
		<section
			className="lg:w-3/5 h-[calc(100vh-180px)] border-r border-[#eaeaea] flex items-center justify-center p-6"
			aria-labelledby={headingId}
		>
			<div className="flex flex-col items-center justify-center text-center">
				<div className="mb-6">
					<img
						src={searchOtter}
						alt="Illustration of an otter with a magnifying glass searching"
						width="120"
						height="120"
					/>
				</div>
				<h2 id={headingId} className="text-2xl font-bold text-[#333] mb-2">
					문제를 찾을 수 없습니다
				</h2>
				<p className="text-[#666] mb-6 max-w-md">
					요청하신 문제가 존재하지 않거나, 삭제되었거나, 일시적으로 사용할 수
					없습니다.
				</p>
			</div>
		</section>
	);
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
	const [activeTab, setActiveTab] = useState("description");
	const [showHints, setShowHints] = useState(false);
	const tabId = "problem-description-tab";
	const panelId = "problem-description-panel";

	const toggleHints = () => {
		setShowHints((prev) => !prev);
	};

	if (!problem) {
		return <ProblemNotFound />;
	}

	return (
		<section
			className="lg:w-3/5 h-[calc(100vh-180px)] border-r border-[#eaeaea]"
			aria-labelledby="problem-title"
		>
			<div className="h-full">
				<header className="p-6 border-b border-[#eaeaea]">
					<div className="mb-4">
						<div className="flex items-center gap-2">
							<h1
								id="problem-title"
								className="text-xl font-medium text-[#333]"
							>
								{problem.title}
							</h1>
							<Badge
								variant={
									problem.difficulty === "Easy"
										? "success"
										: problem.difficulty === "Medium"
											? "warning"
											: "danger"
								}
								aria-label={`Difficulty level: ${problem.difficulty}`}
							>
								{problem.difficulty}
							</Badge>
						</div>
					</div>

					<nav aria-label="Problem tabs">
						<div
							role="tablist"
							aria-orientation="horizontal"
							className="rounded-md text-muted-foreground bg-transparent w-full justify-start h-auto p-0 flex items-center"
						>
							<button
								type="button"
								role="tab"
								id={tabId}
								aria-selected={activeTab === "description"}
								aria-controls={panelId}
								className={`inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 py-2 px-3 rounded-md text-sm font-medium ${activeTab === "description" ? "bg-[#f8f3e7] text-[#c28b3b]" : "text-[#666] hover:bg-[#f8f8f6]"}`}
								onClick={() => setActiveTab("description")}
							>
								<span className="flex items-center">
									<Icon
										id="bookOpen"
										title="Description"
										className="h-4 w-4 mr-1"
									>
										<path d="M12 7v14" />
										<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
									</Icon>
									Description
								</span>
							</button>
							<div className="ml-auto">
								<button
									type="button"
									className="flex items-center gap-1 py-2 px-3 rounded-md text-sm font-medium text-[#c28b3b] hover:bg-[#f8f8f6]"
									onClick={toggleHints}
									aria-pressed={showHints}
									aria-label={showHints ? "Hide hints" : "Show hints"}
								>
									<Icon
										id="eyeIcon"
										title={showHints ? "Hide hints" : "Show hints"}
										className="h-4 w-4 mr-1"
									>
										{showHints ? (
											<>
												<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
												<circle cx="12" cy="12" r="3" />
											</>
										) : (
											<>
												<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
												<path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
												<path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
												<path d="m2 2 20 20" />
											</>
										)}
									</Icon>
									{showHints ? "Hide Hints" : "Show Hints"}
								</button>
							</div>
						</div>
					</nav>
				</header>

				<main
					className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto"
					role="tabpanel"
					id={panelId}
					aria-labelledby={tabId}
				>
					<div className="prose max-w-none">
						{activeTab === "description" && (
							<article>
								<div className="text-[#666] prose-p:whitespace-pre-line">
									<ReactMarkdown
										remarkPlugins={[remarkGfm]}
										components={{
											code({
												node,
												className,
												children,
												style: _,
												ref,
												...props
											}) {
												const match = /language-(\w+)/.exec(className || "");
												return match ? (
													<SyntaxHighlighter
														style={{
															...(vs as { [key: string]: CSSProperties }),
															'pre[class*="language-"]': {
																...vs['pre[class*="language-"]'],
															},
															'code[class*="language-"]': {
																...vs['code[class*="language-"]'],
															},
														}}
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
										{problem.description}
									</ReactMarkdown>
								</div>

								<section aria-labelledby="examples-heading" className="mt-6">
									<h2
										id="examples-heading"
										className="text-lg font-medium text-[#333] mb-3"
									>
										Examples
									</h2>
									{problem.examples.map((example) => (
										<ProblemExample
											key={`example-${example.input}-${example.output}`}
											index={problem.examples.indexOf(example)}
											input={example.input}
											output={example.output}
											explanation={example.explanation}
										/>
									))}
								</section>

								<ProblemListSection
									id="constraints-heading"
									title="Constraints"
									items={problem.constraints}
								/>

								{problem.hints && showHints && (
									<ProblemListSection
										id="hints-heading"
										title="Hints"
										items={problem.hints}
									/>
								)}

								{problem.companies && problem.companies.length > 0 && (
									<ProblemSection id="companies-heading" title="Companies">
										<div className="flex flex-wrap gap-2">
											{problem.companies.map((company) => (
												<Badge
													key={company}
													variant="primary"
													ariaLabel={`Company: ${company}`}
												>
													{company}
												</Badge>
											))}
										</div>
									</ProblemSection>
								)}

								{problem.relatedProblems &&
									problem.relatedProblems.length > 0 && (
										<ProblemSection
											id="related-problems-heading"
											title="Related Problems"
										>
											<ul className="space-y-1">
												{problem.relatedProblems.map((relatedProblem) => (
													<li key={relatedProblem.id}>
														<a
															className="text-sm text-[#c28b3b] hover:underline"
															href={`/problems/${relatedProblem.id}`}
															aria-label={`Problem ${relatedProblem.id}: ${relatedProblem.title}`}
														>
															{relatedProblem.id}. {relatedProblem.title}
														</a>
													</li>
												))}
											</ul>
										</ProblemSection>
									)}
							</article>
						)}
					</div>
				</main>
			</div>
		</section>
	);
}
