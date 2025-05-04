import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { challengesApi, type ChatSessionResponse } from "../challenges";
import { useAuthStore } from "../auth/authStore";

/**
 * Hook for fetching and managing chat sessions for a challenge
 * @param challengeId - The challenge ID
 * @returns A query object with chat session data and mutation functions
 */
export function useChatSession(challengeId: string) {
	const queryClient = useQueryClient();
	const accessToken = useAuthStore((state) => state.accessToken);
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	const chatSessionQuery = useQuery<ChatSessionResponse, Error>({
		queryKey: ["chatSession", challengeId],
		queryFn: () => {
			if (!accessToken || !isAuthenticated) {
				throw new Error("User is not authenticated");
			}
			return challengesApi.getChatSession(challengeId, accessToken);
		},
		enabled: !!challengeId && !!accessToken && isAuthenticated,
		refetchOnWindowFocus: false,
	});

	const sendMessageMutation = useMutation({
		mutationFn: (message: string) => {
			if (!accessToken || !isAuthenticated) {
				throw new Error("User is not authenticated");
			}
			return challengesApi.sendChatMessage(challengeId, message, accessToken);
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["chatSession", challengeId], data);
		},
	});

	return {
		...chatSessionQuery,
		sendMessage: sendMessageMutation.mutate,
		isSending: sendMessageMutation.isPending,
		sendError: sendMessageMutation.error,
	};
}
