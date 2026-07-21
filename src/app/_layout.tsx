import { Paths } from "@/const/global";
import { AuthProvider, useAuth } from "@/context/authContext";
import { Inter_900Black, useFonts } from "@expo-google-fonts/inter";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

// The navigation guard stays in layout since it orchestrates Router changes
function NavigateGate() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // With src/app, the first segment might be undefined if at root, or '(auth)'
    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace(Paths.home);
    } else if (isAuthenticated && inAuthGroup) {
      router.replace(Paths.home);
    }
  }, [isAuthenticated, segments, isLoading, router]);

  return <Slot />;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: Inter_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigateGate />
    </AuthProvider>
  );
}
