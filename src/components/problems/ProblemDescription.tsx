import { useState } from "react";
import { Icon } from "../ui/Icon";
import { Badge } from "../ui/Badge";
import { ProblemDetail } from "./types";

interface ProblemDescriptionProps {
  problem: ProblemDetail;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="lg:w-3/5 h-[calc(100vh-180px)] border-r border-[#eaeaea]">
      <div className="h-full">
        <div className="p-6 border-b border-[#eaeaea]">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-medium text-[#333]">{problem.id}. {problem.title}</h1>
              <Badge variant={
                problem.difficulty === "Easy" ? "success" :
                problem.difficulty === "Medium" ? "warning" : "danger"
              }>
                {problem.difficulty}
              </Badge>
            </div>
          </div>

          <div dir="ltr" data-orientation="horizontal" className="w-full">
            <div role="tablist" aria-orientation="horizontal" className="inline-flex items-center rounded-md text-muted-foreground bg-transparent w-full justify-start h-auto p-0">
              <button 
                type="button" 
                role="tab" 
                aria-selected={activeTab === "description"} 
                className={`inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 py-2 px-3 rounded-md text-sm font-medium ${activeTab === "description" ? "bg-[#f8f3e7] text-[#c28b3b]" : "text-[#666] hover:bg-[#f8f8f6]"}`}
                onClick={() => setActiveTab("description")}
              >
                <div className="flex items-center">
                  <Icon id="bookOpen" title="Description" className="h-4 w-4 mr-1">
                    <path d="M12 7v14"></path>
                    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                  </Icon>
                  Description
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
          <div className="prose max-w-none">
            {activeTab === "description" && (
              <>
                <div className="whitespace-pre-line">{problem.description}</div>

                {problem.examples.map((example, index) => (
                  <div key={index} className="mt-4">
                    <p className="font-medium">Example {index + 1}:</p>
                    <p>Input: {example.input}</p>
                    <p>Output: {example.output}</p>
                    {example.explanation && <p>Explanation: {example.explanation}</p>}
                  </div>
                ))}

                <div className="mt-4">
                  <p className="font-medium">Constraints:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index} className="text-[#666]">{constraint}</li>
                    ))}
                  </ul>
                </div>

                {problem.hints && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-[#333] mb-2">Hints</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {problem.hints.map((hint, index) => (
                        <li key={index} className="text-[#666]">{hint}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
