import { useQuery } from "@tanstack/react-query";
import { challengesApi, type ChallengesListResponse } from "../challenges";

/**
 * Hook for fetching a list of challenges with pagination
 * @param page - The page number (0-based)
 * @param size - The number of items per page
 * @param search - Optional search query
 * @param difficulty - Optional difficulty filter
 * @param tag - Optional tag filter
 * @returns A query object with the list of challenges and pagination info
 */
export function useChallenges(
	page = 0,
	size = 10,
	search?: string,
	difficulty?: string,
	tag?: string,
) {
	return useQuery<ChallengesListResponse, Error>({
		queryKey: ["challenges", page, size, search, difficulty, tag],
		queryFn: () =>
			challengesApi.getChallenges(page, size, search, difficulty, tag),
		placeholderData: (keepPreviousData) => keepPreviousData,
	});
}
