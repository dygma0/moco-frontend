import { createFileRoute } from "@tanstack/react-router";
import type { ProblemDetail } from "../../components/problems/types";
import { BackNavigation } from "../../components/problems/BackNavigation";
import { ProblemDescription } from "../../components/problems/ProblemDescription";
import { DiscussionChatBox } from "../../components/problems/DiscussionChatBox.tsx";
import { ProblemDescriptionSkeleton } from "../../components/problems/ProblemDescriptionSkeleton";
import { useChallenge } from "../../api/hooks/useChallenge";
import { mapChallengeToProblemDetail } from "../../api/mappers/challengeMapper";
import { SEO } from "../../components/SEO";

export const Route = createFileRoute("/problems/$id")({
	component: ProblemDetailPage,
});

function ProblemDetailPage() {
	const { id } = Route.useParams();
	const { data: challengeData, isLoading, isError, error } = useChallenge(id);

	const problem: ProblemDetail | undefined = challengeData
		? mapChallengeToProblemDetail(challengeData)
		: undefined;

	const pageTitle = problem
		? `Problem ${id} - ${problem.title} | Quibe`
		: `Problem ${id} | Quibe`;

	const pageDescription = problem
		? `${problem.description.substring(0, 150)}...`
		: `Solve coding challenge Problem ${id} on Quibe - Improve your programming skills with interactive problems`;

	return (
		<main className="flex-1 p-6 overflow-auto" aria-labelledby="problem-title">
			<SEO
				title={pageTitle}
				description={pageDescription}
				keywords={`coding challenge, problem ${id}, programming, algorithm, quibe`}
				ogType="article"
			/>

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
					<div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-sm overflow-hidden">
						<ProblemDescriptionSkeleton />
						<div className="lg:w-2/5 h-[calc(100vh-180px)] p-6 bg-gray-50 animate-pulse">
							<div className="h-8 w-3/4 bg-gray-200 rounded mb-4" />
							<div className="h-40 bg-gray-200 rounded" />
						</div>
					</div>
				)}

				{!isLoading && (
					<article
						id="problem-content"
						className="flex flex-col lg:flex-row bg-white rounded-lg shadow-sm overflow-hidden"
					>
						<ProblemDescription problem={!isError ? problem : undefined} />
						<DiscussionChatBox
							challengeId={id}
							disabled={isError || !problem}
						/>
					</article>
				)}
			</div>
		</main>
	);
}
