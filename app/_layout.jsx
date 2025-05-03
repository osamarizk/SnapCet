import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  UIManager,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useLoadFonts } from "../lib/useLoadFonts";
import GlobalProvider from "../context/GlobalProvider";
import DeepLinkHandler from "../components/DeepLinkHandler";
const Rootlayout = () => {
  // Laod fonts and handle errorrs of font loading
  const { fontsLoaded, error } = useLoadFonts();
  if (!fontsLoaded && !error) return null;
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Moves content up when keyboard appears
        style={{ flex: 1 }}
      >
        {/* <DeepLinkHandler /> */}
        <GlobalProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </GlobalProvider>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Rootlayout;
