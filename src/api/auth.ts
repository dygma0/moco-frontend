export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message?: string;
}

const API_BASE_URL = 'https://api-quibe.otter.coffee/api';

export const authApi = {
  /**
   * Sign up a new user
   * @param data - The signup data (name, email, password)
   * @returns A promise that resolves to the signup response
   */
  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
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
      } catch (textError) {
      }
      throw new Error(errorMessage);

    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  },
};
