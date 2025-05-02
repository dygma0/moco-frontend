import { useState } from "react";
import { Icon } from "../ui/Icon";
import { Badge } from "../ui/Badge";
import { ProblemDetail } from "./types";

interface ProblemDescriptionProps {
  problem: ProblemDetail;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const [activeTab, setActiveTab] = useState("description");
  const tabId = "problem-description-tab";
  const panelId = "problem-description-panel";

  return (
    <section className="lg:w-3/5 h-[calc(100vh-180px)] border-r border-[#eaeaea]" aria-labelledby="problem-title">
      <div className="h-full">
        <header className="p-6 border-b border-[#eaeaea]">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <h1 id="problem-title" className="text-xl font-medium text-[#333]">{problem.id}. {problem.title}</h1>
              <Badge 
                variant={
                  problem.difficulty === "Easy" ? "success" :
                  problem.difficulty === "Medium" ? "warning" : "danger"
                }
                role="status"
                ariaLabel={`Difficulty level: ${problem.difficulty}`}
              >
                {problem.difficulty}
              </Badge>
            </div>
          </div>

          <div className="w-full">
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
                  <Icon id="bookOpen" title="Description" className="h-4 w-4 mr-1">
                    <path d="M12 7v14"></path>
                    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                  </Icon>
                  Description
                </span>
              </button>
            </div>
          </div>
        </header>

        <div 
          className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto"
          role="tabpanel"
          id={panelId}
          aria-labelledby={tabId}
          tabIndex={0}
        >
          <div className="prose max-w-none">
            {activeTab === "description" && (
              <>
                <p className="whitespace-pre-line">{problem.description}</p>

                <section aria-labelledby="examples-heading">
                  <h2 id="examples-heading" className="sr-only">Examples</h2>
                  {problem.examples.map((example, index) => (
                    <article key={index} className="mt-4">
                      <h3 className="font-medium">Example {index + 1}:</h3>
                      <p><strong>Input:</strong> {example.input}</p>
                      <p><strong>Output:</strong> {example.output}</p>
                      {example.explanation && <p><strong>Explanation:</strong> {example.explanation}</p>}
                    </article>
                  ))}
                </section>

                <section className="mt-4" aria-labelledby="constraints-heading">
                  <h2 id="constraints-heading" className="font-medium">Constraints:</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index} className="text-[#666]">{constraint}</li>
                    ))}
                  </ul>
                </section>

                {problem.hints && (
                  <section className="mt-8" aria-labelledby="hints-heading">
                    <h2 id="hints-heading" className="text-lg font-medium text-[#333] mb-2">Hints</h2>
                    <ul className="list-disc pl-5 space-y-1">
                      {problem.hints.map((hint, index) => (
                        <li key={index} className="text-[#666]">{hint}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
