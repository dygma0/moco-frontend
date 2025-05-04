import type { ChallengeResponse } from "../challenges";
import type { ProblemDetail } from "../../components/problems/types";
import type { ProblemRowProps } from "../../components/problems/ProblemRow";

/**
 * Maps a ChallengeResponse from the API to a ProblemDetail for the UI
 * @param challenge - The challenge response from the API
 * @returns A ProblemDetail object for the UI
 */
export function mapChallengeToProblemDetail(
	challenge: ChallengeResponse,
): ProblemDetail {
	return {
		id: challenge.id,
		title: challenge.title,
		difficulty: challenge.difficulty as "Easy" | "Medium" | "Hard",
		acceptance: "N/A",
		description: challenge.description,
		examples: challenge.examples,
		constraints: challenge.constraints,
		hints: challenge.content ? [challenge.content] : undefined,
	};
}

/**
 * Maps a ChallengeResponse from the API to a ProblemRowProps for the problems list
 * @param challenge - The challenge response from the API
 * @returns A ProblemRowProps object for the problems list
 */
export function mapChallengeToProblemRow(
	challenge: ChallengeResponse,
): ProblemRowProps {
	return {
		id: challenge.id,
		title: challenge.title,
		difficulty: challenge.difficulty as "Easy" | "Medium" | "Hard",
		tags: challenge.tags,
		// isPremium is not provided by the API, so we don't set it
	};
}
