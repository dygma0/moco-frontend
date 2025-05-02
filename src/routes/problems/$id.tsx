import { createFileRoute } from "@tanstack/react-router";
import { ProblemDetail } from "../../components/problems/types";
import { BackNavigation } from "../../components/problems/BackNavigation";
import { ProblemDescription } from "../../components/problems/ProblemDescription";
import { UnderstandingCheck } from "../../components/problems/UnderstandingCheck";
import { useEffect } from "react";

export const Route = createFileRoute("/problems/$id")({
  component: ProblemDetailPage,
});

function ProblemDetailPage() {
  const { id } = Route.useParams();

  // Update document title when component mounts
  useEffect(() => {
    document.title = `Problem ${id} - Two Sum | Quibe`;
    return () => {
      document.title = "Quibe";
    };
  }, [id]);

  // Mock data for the problem detail
  const problem: ProblemDetail = {
    id: parseInt(id),
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: "48.2%",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
      "Try to use the fact that the complement of the number we need is already in the hash table."
    ],
    companies: ["Amazon", "Google", "Apple", "Microsoft"],
    relatedProblems: [
      { id: 15, title: "3Sum" },
      { id: 18, title: "4Sum" },
      { id: 167, title: "Two Sum II - Input Array Is Sorted" }
    ]
  };

  return (
    <main className="flex-1 p-6 overflow-auto" aria-labelledby="problem-title">
      <div className="max-w-[1200px] mx-auto">
        {/* Skip link for keyboard users */}
        <a href="#problem-content" className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-white focus:z-10">
          Skip to problem content
        </a>

        <BackNavigation href="/problems" text="Back to Problems" />

        <article id="problem-content" className="flex flex-col lg:flex-row bg-white rounded-lg shadow-sm overflow-hidden">
          <ProblemDescription problem={problem} />
          <UnderstandingCheck />
        </article>
      </div>
    </main>
  );
}
