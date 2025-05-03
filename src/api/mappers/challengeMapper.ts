import type { ChallengeResponse } from "../challenges";
import type { ProblemDetail } from "../../components/problems/types";

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
