export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message?: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SigninResponse {
  success: boolean;
  message?: string;
  accessToken?: string;
  userId?: string;
  name?: string;
  email?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

import { API_BASE_URL } from "../config/constants";

export const authApi = {
  /**
   * Sign up a new user
   * @param data - The signup data (name, email, password)
   * @returns A promise that resolves to the signup response
   */
  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return { success: true };
      }

      let errorMessage = `Signup failed with status: ${response.status}`;
      try {
        const errorText = await response.text();
        if (errorText) {
          errorMessage = errorText;
        }
      } catch (textError) {}
      throw new Error(errorMessage);
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  },

  /**
   * Sign in a user
   * @param data - The signin data (email, password)
   * @returns A promise that resolves to the signin response
   */
  signin: async (data: SigninRequest): Promise<SigninResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            `Signin failed with status: ${response.status}`,
        );
      }

      return {
        success: true,
        ...responseData,
      };
    } catch (error) {
      console.error("Signin error:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  },
};
