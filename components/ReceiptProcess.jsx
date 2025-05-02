import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import ReceiptFull from "./ReceiptFull";
import { extractReceiptData } from "../lib/extractReceiptData";
import images from "../constants/images";
import Checkbox from "expo-checkbox"; // Make sure expo-checkbox is installed

const ReceiptProcess = ({ imageUri, onCancel }) => {
  const [showFullImage, setShowFullImage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [consentGiven, setConsentGiven] = useState(false);

  const handleProcessReceipt = async () => {
    try {
      setIsProcessing(true);
      const data = await extractReceiptData(imageUri);
      setExtractedData(data);
      Alert.alert("Success", "Receipt processed successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to extract receipt data.");
      console.error("Receipt extraction failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = () => {
    // if (!consentGiven) {
    //   Alert.alert(
    //     "Consent Required",
    //     "Please check the box to give your consent before saving."
    //   );
    //   return;
    // }
    Alert.alert("Saved", "Your receipt data has been saved!");
    // Handle actual saving logic here
  };

  return (
    <View className="bg-onboarding/40 rounded-xl px-6 pt-2 pb-1 border-2 border-[#b94040]  max-h-[80vh] ">
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingBottom: 1 ,flexGrow:1 }}
        showsVerticalScrollIndicator={true}
        // style={{ borderColor: 'red', borderWidth: 1 }}
      >
        <Text className="text-xl text-blue-900 font-pbold text-center mb-2">
          {!extractedData
            ? "Receipt Processing..."
            : "🎉 Receipt Extracted Successfuly"}
        </Text>

        {!extractedData && (
          <TouchableOpacity
            onPress={() => setShowFullImage(true)}
            className="relative w-full"
          >
            <Image
              source={{ uri: imageUri }}
              resizeMode="contain"
              className="w-full aspect-[5/6] mb-1 mt-4 rounded-3xl"
            />
            <View className="absolute bottom-36 right-2 bg-black/70 px-2 py-1 rounded">
              <Text className="font-psemibold text-base text-white">
                Tap to view full
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {!extractedData && (
          <>
            {isProcessing ? (
              <View className="items-center mt-6 mb-6">
                <ActivityIndicator size="large" color="#ef6969" />
                <Text className="mt-2 font-pregular text-black/70">
                  {`Processing...\n Our platform uses advanced AI to automatically extract key details from your uploaded receipt.`}
                </Text>
              </View>
            ) : (
              <View className="flex-row justify-center items-center gap-6 mt-4 mb-6">
                <TouchableOpacity onPress={onCancel}>
                  <View className="items-center">
                    <Image
                      source={images.cancel}
                      resizeMode="contain"
                      className="w-[50px] h-[50px] rounded-full p-1 border-2 border-red-400 opacity-90"
                    />
                    <Text className="mt-1 font-pregular text-sm text-black/80">
                      Cancel
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleProcessReceipt}>
                  <View className="items-center">
                    <Image
                      source={images.confirm}
                      resizeMode="contain"
                      className="w-[50px] h-[50px] rounded-full p-1 border-2 border-green-500 opacity-90"
                    />
                    <Text className="mt-1 font-pregular text-sm text-black/80">
                      Process
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {extractedData && (
          <>
            <View className="w-full  mt-2 px-6 py-2 bg-slate-200  rounded-xl border-2 border-[#b94040]  mb-2">
              <Text className="font-psemibold text-lg mb-4 text-secondary text-center">
                Receipt Details
              </Text>
              {extractedData && (
                <Image
                  source={images.success}
                  className=" absolute w-16 h-16  right-1"
                  resizeMode="contain"
                />
              )}

              {extractedData.merchant && (
                <Text className="text-blue-900 font-psemibold mb-3">
                  <Text className="text-black font-semibold text-base ">
                    🏪 Merchant:
                  </Text>{" "}
                  {extractedData.merchant}
                </Text>
              )}
              {extractedData.location && (
                <Text className="text-blue-900 font-psemibold mb-3">
                  <Text className="text-black font-pbold text-base">
                    📍 Location:
                  </Text>{" "}
                  {extractedData.location}
                </Text>
              )}
              {extractedData.datetime && (
                <Text className="text-blue-900 font-psemibold mb-3">
                  <Text className="text-black font-pbold text-base">
                    📅 Date:
                  </Text>{" "}
                  {extractedData.datetime}
                </Text>
              )}
              {extractedData.items?.length > 0 && (
                <View className="mb-3">
                  <Text className="font-pbold text-base text-black mb-1">
                    🛒 Items:
                  </Text>
                  {extractedData.items.map((item, index) => (
                    <>
                      <Text
                        key={index}
                        className="text-black/70 font-psemibold ml-4 mb-2 text-blue-900"
                      >
                        • {item.name || "Unnamed item"}{" "}
                        <Text className="text-black/70 font-bold text-secondary text-base">
                          {item.price || "N/A"}
                        </Text>
                      </Text>
                    </>
                  ))}
                </View>
              )}

              {extractedData.subtotal && (
                <Text className="text-secondary text-base font-psemibold mb-3">
                  <Text className="text-black font-pbold text-base">
                    💵 Subtotal:
                  </Text>{" "}
                  {extractedData.subtotal}
                </Text>
              )}
              {extractedData.vat && (
                <Text className="text-secondary text-base font-psemibold mb-3">
                  <Text className="text-black font-pbold text-base">
                    🧾 VAT:
                  </Text>{" "}
                  {extractedData.vat}
                </Text>
              )}
            </View>
            {extractedData.total && (
              <Text className="text-blue-900 font-psemibold mb-3 text-xl">
                <Text className="text-black font-pbold text-xl">💰 Total:</Text>{" "}
                {extractedData.total}
              </Text>
            )}

            {/* Consent checkbox */}
            {/* <View className="flex-row items-center mt-2 gap-2 px-2">
              <Checkbox
                value={consentGiven}
                onValueChange={setConsentGiven}
                color={consentGiven ? "#22c55e" : undefined}
              />
              <Text className="text-base text-black/70 font-psemibold ">
                I agree to save this data securely.
              </Text>
            </View> */}

            {/* Buttons */}
            <View className="flex-row justify-center items-center gap-6 mt-0 mb-1">
              <TouchableOpacity onPress={onCancel}>
                <View className="items-center">
                  <Image
                    source={images.cancel}
                    resizeMode="contain"
                    className="w-[55px] h-[55px] rounded-full p-1 border-2 border-red-400 opacity-90"
                  />
                  <Text className="mt-1 font-pregular text-sm text-black/80">
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSave}>
                <View className="items-center opacity-100">
                  <Image
                    source={images.confirm}
                    resizeMode="contain"
                    className={`w-[55px] h-[55px] rounded-full p-1 border-2 ${
                      consentGiven ? "border-green-500" : "border-gray-300"
                    }`}
                  />
                  <Text className="mt-1 font-pregular text-sm text-black/80">
                    Save
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      <ReceiptFull
        imageUri={imageUri}
        visible={showFullImage}
        onClose={() => setShowFullImage(false)}
      />
    </View>
  );
};

export default ReceiptProcess;
