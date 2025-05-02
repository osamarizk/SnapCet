import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const home = () => {
  return (
    <SafeAreaView className="bg-onboarding h-full">
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View className=" justify-center items-center px-4 py-6  min-h-[85vh]">
        <Link href="/sign-in">
        <Text>Sign-In</Text>
        </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
