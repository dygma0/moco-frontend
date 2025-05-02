// Define the problem detail interface
export interface ProblemDetail {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  acceptance: string;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  hints?: string[];
  companies?: string[];
  relatedProblems?: {
    id: number;
    title: string;
  }[];
}
