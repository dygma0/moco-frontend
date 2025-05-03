import { useQuery } from "@tanstack/react-query";
import { type ChallengeResponse, challengesApi } from "../challenges";

/**
 * Hook for fetching challenge details
 * @param id - The challenge ID
 * @returns A query object with challenge details
 */
export function useChallenge(id: string) {
	return useQuery<ChallengeResponse, Error>({
		queryKey: ["challenge", id],
		queryFn: () => challengesApi.getChallenge(id),
		enabled: !!id,
	});
}
