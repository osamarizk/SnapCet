import { View, Text, ScrollView, Image } from "react-native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import images from "../constants/images";
import { useGlobalContext } from "../context/GlobalProvider";
const Index = () => {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-onboarding h-full">
      <ScrollView>
        <View className=" justify-center items-center px-4 py-6  min-h-[85vh] ">
          <Image
            source={images.logoo7}
            resizeMode="contain"
            className="w-[230px] h-[105px] "
          />

          <Image
            source={images.gr}
            resizeMode="contain"
            className="min-w-[90vh] h-[340px] -mt-3"
          />
          <View className="relative">
            <Text className="text-2xl text-gray-700 font-psemibold text-center mt-3">
            Receipts are tedious to manage,{"\n"}
            are often lost and hard to track{"\n "}
           
            </Text> 
            {/* <Text className="text-sm text-secondary font-pregular text-center -mt-7 ">--------------------------------------------------{"\n "}</Text> */}
            
          </View>
          <Image
              source={images.mobrc}
              className="w-[370px] h-[360px] absolute bottom-80"
              resizeMode="contain"
            />
            {/* <Text className="text-secondary text-2xl font-pbold text-center mt-1">O7 Empower the best solution</Text> */}
          <Text className="text-gray-600 font-pregular text-base -mt-3 text-left px-1  rounded-xl  border-2 border-secondary border-t-0 border-y-0">
        
            - Capture and upload your receipt with ease.{"\n"}{"\n"}
            - Let AI handle the storing and processing for you.{"\n"}{"\n"}
            - Say goodbay to hassle of manual record-keeping.{"\n"}{"\n"}
            - No Personal informations is shared ever.
          </Text>

          <CustomButton
            title="Continue with mail"
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyle="w-full mt-4"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Index;
