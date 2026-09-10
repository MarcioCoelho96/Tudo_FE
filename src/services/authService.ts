import { API_BASE_URL, REFRESH_TOKEN_KEY, TOKEN_KEY } from "@/const/global";
import * as SecureStore from "expo-secure-store";

import { Platform } from "react-native";

export interface AuthResponse {
  token: string;
  refreshToken: string;
}

const getBaseUrl = () => {
  if (Platform.OS === "android") {
    return API_BASE_URL;
  }
  return API_BASE_URL;
};

const BASE_URL = getBaseUrl();

export const authService = {
  async getSessionToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },

  async getRefreshToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  },

  async saveSessionToken(tokens: AuthResponse): Promise<void> {
    await Promise.all([
      SecureStore.setItemAsync(TOKEN_KEY, tokens.token),
      SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken),
    ]);
  },

  async deleteSessionToken(): Promise<void> {
    await Promise.all([
      SecureStore.deleteItemAsync(TOKEN_KEY),
      SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
    ]);
  },

  async requestSmsCode(phoneNumber: string): Promise<void> {
    try {
      // 1. Sanitize/format phone number (strips spaces/dashes, ensures leading '+')
      const formattedPhone = phoneNumber.trim().startsWith("+")
        ? phoneNumber.trim()
        : `+${phoneNumber.replace(/\D/g, "")}`;

      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: formattedPhone }),
      });

      if (!response.ok) {
        // 2. Read raw response text first to handle empty or HTML error responses
        const rawText = await response.text();
        let errorData: Record<string, any> = {};

        try {
          errorData = JSON.parse(rawText);
        } catch {
          // Response was not JSON (e.g. 500 internal HTML error or proxy issue)
        }

        console.error(
          `[authService] API HTTP Error ${response.status}:`,
          rawText,
        );

        const errorMessage =
          errorData.message ||
          errorData.error ||
          `Server responded with status ${response.status}`;

        throw new Error(errorMessage);
      }

      console.log("[authService] SMS code requested successfully.");
    } catch (error: any) {
      console.error("[authService] requestSmsCode failed:", error);
      // 3. Re-throw so your UI/screen can handle loading state and show an alert
      throw error;
    }
  },

  async validateSmsCode(
    phoneNumber: string,
    validationCode: string,
  ): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/auth/validate`, {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        validationCode: validationCode,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to validate SMS code");
    }

    const data = await response.json();
    return data;
  },

  async logout(refreshToken: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to logout");
    }
  },
};
