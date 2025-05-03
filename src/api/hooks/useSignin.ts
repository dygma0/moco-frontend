import { useMutation } from "@tanstack/react-query";
import { authApi, type SigninRequest, type SigninResponse } from "../auth";
import { useAuthStore } from "../auth/authStore";

/**
 * Hook for signing in a user
 * @returns A mutation object for signing in
 */
export function useSignin() {
	const setAuth = useAuthStore((state) => state.setAuth);

	return useMutation<SigninResponse, Error, SigninRequest>({
		mutationFn: (data) => authApi.signin(data),
		onSuccess: (data) => {
			if (
				data.success &&
				data.accessToken &&
				data.userId &&
				data.name &&
				data.email
			) {
				// Store the authentication data
				setAuth(data.accessToken, data.userId, data.name, data.email);
			}
		},
	});
}
