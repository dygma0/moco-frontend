import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { LessonTextSection } from "../../../api/challenges";

interface TextContentProps {
  section: LessonTextSection;
}

export function TextContent({ section }: TextContentProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-[#333] mb-6">{section.title}</h2>
      <div className="markdown-content text-[#666] text-base">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {section.data}
        </ReactMarkdown>
      </div>
    </div>
  );
}
