import { useMutation } from "@tanstack/react-query";
import { authApi, type SignupRequest, type SignupResponse } from "../auth";

export function useSignup() {
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: (data) => authApi.signup(data),
  });
}
