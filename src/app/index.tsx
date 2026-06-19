// app/index.tsx
import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuth } from "./_layout";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show a native loading spinner while the application resolves
  // the user's token or session from storage.
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If authenticated, deep-link straight to the home route inside (dashboard).
  // Otherwise, fallback safely to the authentication flow.
  return isAuthenticated ? (
    <Redirect href="/home" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Match your app's background color palette
  },
});
