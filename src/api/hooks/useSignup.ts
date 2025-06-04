import { useMutation } from "@tanstack/react-query";
import { type SignupRequest, type SignupResponse, authApi } from "../auth";

export function useSignup() {
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: (data) => authApi.signup(data),
  });
}
