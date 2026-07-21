import { API_BASE_URL, TOKEN_KEY } from "@/const/global";
import * as SecureStore from "expo-secure-store";

import { Platform } from "react-native";

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

  async saveSessionToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  async deleteSessionToken(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },

  async requestSmsCode(phoneNumber: string): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: phoneNumber }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to send SMS code");
      }
    } catch (error) {
      // If the network fails, it will hit this debugger instead!
      console.error("Fetch failed entirely:", error);
    }
  },

  async validateSmsCode(
    phoneNumber: string,
    validationCode: string,
  ): Promise<string> {
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
    return data.token;
  },
};
