import { createFileRoute } from "@tanstack/react-router";
import type { ProblemDetail } from "../../components/problems/types";
import { BackNavigation } from "../../components/problems/BackNavigation";
import { ProblemDescription } from "../../components/problems/ProblemDescription";
import { UnderstandingCheck } from "../../components/problems/UnderstandingCheck";
import { useEffect } from "react";
import { useChallenge } from "../../api/hooks/useChallenge";
import { mapChallengeToProblemDetail } from "../../api/mappers/challengeMapper";

export const Route = createFileRoute("/problems/$id")({
	component: ProblemDetailPage,
});

function ProblemDetailPage() {
	const { id } = Route.useParams();
	const { data: challengeData, isLoading, isError, error } = useChallenge(id);

	const problem: ProblemDetail | undefined = challengeData
		? mapChallengeToProblemDetail(challengeData)
		: undefined;

	useEffect(() => {
		if (problem) {
			document.title = `Problem ${id} - ${problem.title} | Quibe`;
		} else {
			document.title = `Problem ${id} | Quibe`;
		}
		return () => {
			document.title = "Quibe";
		};
	}, [id, problem]);

	return (
		<main className="flex-1 p-6 overflow-auto" aria-labelledby="problem-title">
			<div className="max-w-[1200px] mx-auto">
				{/* Skip link for keyboard users */}
				<a
					href="#problem-content"
					className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-white focus:z-10"
				>
					Skip to problem content
				</a>

				<BackNavigation href="/problems" text="Back to Problems" />

				{isLoading && (
					<div className="flex justify-center items-center h-64">
						<div className="h-8 w-8 animate-spin rounded-full border-4 border-[#c28b3b] border-t-transparent" />
					</div>
				)}

				{isError && (
					<div className="bg-white rounded-lg shadow-sm p-6 text-center">
						<h2 className="text-xl font-medium text-red-600 mb-2">
							Error Loading Problem
						</h2>
						<p className="text-[#666]">
							{error?.message || "An unknown error occurred"}
						</p>
						<button
							type="button"
							onClick={() => window.location.reload()}
							className="mt-4 px-4 py-2 bg-[#c28b3b] text-white rounded-md hover:bg-[#b27a2a]"
						>
							Try Again
						</button>
					</div>
				)}

				{!isLoading && !isError && problem && (
					<article
						id="problem-content"
						className="flex flex-col lg:flex-row bg-white rounded-lg shadow-sm overflow-hidden"
					>
						<ProblemDescription problem={problem} />
						<UnderstandingCheck />
					</article>
				)}
			</div>
		</main>
	);
}
