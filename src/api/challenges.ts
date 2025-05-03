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

const API_BASE_URL = "https://api-quibe.otter.coffee/api";

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
};
