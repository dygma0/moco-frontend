export interface ChallengeResponse {
	id: string;
	title: string;
	description: string;
	descriptionHighlightTokens: Array<{
		token: string;
		isHighlighted: boolean;
	}>;
	instructions: string;
	difficulty: string;
	tags: string[];
	content: string;
	examples: Array<{
		input: string;
		output: string;
		explanation?: string;
	}>;
	constraints: string[];
	createdAt: string;
	updatedAt: string;
}

export interface ChallengesListResponse {
	content: ChallengeResponse[];
	pageable: {
		pageNumber: number;
		pageSize: number;
		sort: {
			empty: boolean;
			sorted: boolean;
			unsorted: boolean;
		};
		offset: number;
		paged: boolean;
		unpaged: boolean;
	};
	last: boolean;
	totalPages: number;
	totalElements: number;
	size: number;
	number: number;
	sort: {
		empty: boolean;
		sorted: boolean;
		unsorted: boolean;
	};
	first: boolean;
	numberOfElements: number;
	empty: boolean;
}

import { API_BASE_URL } from "../config/constants";

export const challengesApi = {
	/**
	 * Get challenge details by ID
	 * @param id - The challenge ID
	 * @returns A promise that resolves to the challenge details
	 */
	getChallenge: async (id: string): Promise<ChallengeResponse> => {
		try {
			const response = await fetch(`${API_BASE_URL}/challenges/${id}`, {
				method: "GET",
				headers: {
					Accept: "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(
					`Failed to fetch challenge with status: ${response.status}`,
				);
			}

			return await response.json();
		} catch (error) {
			console.error("Error fetching challenge:", error);
			throw error;
		}
	},

	/**
	 * Get a list of challenges with pagination
	 * @param page - The page number (0-based)
	 * @param size - The number of items per page
	 * @param search - Optional search query
	 * @param difficulty - Optional difficulty filter
	 * @param tag - Optional tag filter
	 * @returns A promise that resolves to the list of challenges with pagination info
	 */
	getChallenges: async (
		page: number = 0,
		size: number = 10,
		search?: string,
		difficulty?: string,
		tag?: string,
	): Promise<ChallengesListResponse> => {
		try {
			const params = new URLSearchParams();
			params.append("page", page.toString());
			params.append("size", size.toString());

			if (search) {
				params.append("search", search);
			}

			if (difficulty && difficulty !== "Any Difficulty") {
				params.append("difficulty", difficulty);
			}

			if (tag && tag !== "Any Tag") {
				params.append("tag", tag);
			}

			const response = await fetch(`${API_BASE_URL}/challenges?${params.toString()}`, {
				method: "GET",
				headers: {
					Accept: "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(
					`Failed to fetch challenges with status: ${response.status}`,
				);
			}

			return await response.json();
		} catch (error) {
			console.error("Error fetching challenges:", error);
			throw error;
		}
	},
};
