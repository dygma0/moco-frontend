import { useState } from "react";
import { Icon } from "../ui/Icon";
import { Badge } from "../ui/Badge";
import { ProblemDetail } from "./types";
import { ProblemExample } from "./ProblemExample";
import { ProblemSection, ProblemListSection } from "./ProblemSection";

interface ProblemDescriptionProps {
	problem: ProblemDetail;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
	const [activeTab, setActiveTab] = useState("description");
	const tabId = "problem-description-tab";
	const panelId = "problem-description-panel";

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
								{problem.id}. {problem.title}
							</h1>
							<Badge
								variant={
									problem.difficulty === "Easy"
										? "success"
										: problem.difficulty === "Medium"
											? "warning"
											: "danger"
								}
								role="status"
								ariaLabel={`Difficulty level: ${problem.difficulty}`}
							>
								{problem.difficulty}
							</Badge>
						</div>
					</div>

					<nav aria-label="Problem tabs">
						<div
							role="tablist"
							aria-orientation="horizontal"
							className="inline-flex items-center rounded-md text-muted-foreground bg-transparent w-full justify-start h-auto p-0"
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
										<path d="M12 7v14"></path>
										<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
									</Icon>
									Description
								</span>
							</button>
						</div>
					</nav>
				</header>

				<main
					className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto"
					role="tabpanel"
					id={panelId}
					aria-labelledby={tabId}
					tabIndex={0}
				>
					<div className="prose max-w-none">
						{activeTab === "description" && (
							<article>
								<p className="whitespace-pre-line text-[#666]">
									{problem.description}
								</p>

								<section aria-labelledby="examples-heading" className="mt-6">
									<h2
										id="examples-heading"
										className="text-lg font-medium text-[#333] mb-3"
									>
										Examples
									</h2>
									{problem.examples.map((example, index) => (
										<ProblemExample
											key={index}
											index={index}
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

								{problem.hints && (
									<ProblemListSection
										id="hints-heading"
										title="Hints"
										items={problem.hints}
									/>
								)}

								{problem.companies && problem.companies.length > 0 && (
									<ProblemSection id="companies-heading" title="Companies">
										<div className="flex flex-wrap gap-2">
											{problem.companies.map((company, index) => (
												<Badge
													key={index}
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
												{problem.relatedProblems.map(
													(relatedProblem, index) => (
														<li key={index}>
															<a
																className="text-sm text-[#c28b3b] hover:underline"
																href={`/problems/${relatedProblem.id}`}
																aria-label={`Problem ${relatedProblem.id}: ${relatedProblem.title}`}
															>
																{relatedProblem.id}. {relatedProblem.title}
															</a>
														</li>
													),
												)}
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
