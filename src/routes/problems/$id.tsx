import { createFileRoute } from "@tanstack/react-router";
import type { ProblemDetail } from "../../components/problems/types";
import { BackNavigation } from "../../components/problems/BackNavigation";
import { ProblemDescription } from "../../components/problems/ProblemDescription";
import { UnderstandingCheck } from "../../components/problems/UnderstandingCheck";
import { ProblemNotFound } from "../../components/problems/ProblemNotFound";
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

				{isError && <ProblemNotFound />}

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
