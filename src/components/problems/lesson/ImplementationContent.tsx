import { useState } from "react";
import { type LessonImplementationSection } from "../../../api/challenges";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ImplementationContentProps {
  section: LessonImplementationSection;
}

export function ImplementationContent({ section }: ImplementationContentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const sortedSteps = [...section.data.codeSteps].sort((a, b) => a.order - b.order);
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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-[#333] mb-6">{section.title}</h2>

      <div className="bg-[#f8f8f6] p-4 rounded-lg mb-4">
        <h3 className="text-lg font-medium text-[#333] mb-2">{section.data.title}</h3>
        <p className="text-[#666] text-base mb-4">{section.data.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black rounded-lg overflow-hidden">
          <div className="bg-[#1e1e1e] text-white p-2 text-sm">
            코드 (단계 {currentStep + 1}/{sortedSteps.length})
          </div>
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            customStyle={{ margin: 0, padding: '1rem' }}
          >
            {currentStepData.code}
          </SyntaxHighlighter>
        </div>

        <div className="bg-[#f8f8f6] rounded-lg overflow-hidden">
          <div className="bg-[#e6e6e6] p-2 text-sm">
            설명
          </div>
          <div className="p-4">
            <div className="markdown-content text-[#666] text-base">
              <h4 className="text-md font-medium text-[#333] mb-2">
                {currentStepData.explanation.split('\n')[0].replace('## ', '')}
              </h4>
              <p className="text-[#666] text-base">
                {currentStepData.explanation.split('\n').slice(1).join('\n')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 border border-[#e0e0e0] rounded-md hover:bg-[#f8f3e7] disabled:opacity-50"
          onClick={handlePrevStep}
          disabled={currentStep === 0}
        >
          이전 단계
        </button>

        <div className="text-[#666]">
          {currentStep + 1} / {sortedSteps.length}
        </div>

        <button
          className="px-4 py-2 bg-[#c28b3b] text-white rounded-md hover:bg-[#a67a2e] disabled:opacity-50"
          onClick={handleNextStep}
          disabled={currentStep === sortedSteps.length - 1}
        >
          다음 단계
        </button>
      </div>
    </div>
  );
}
