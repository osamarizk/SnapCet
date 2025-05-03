import * as FileSystem from "expo-file-system";
import Constants from "expo-constants";

export async function extractReceiptData(imageUri) {
  const GEMINI_API_KEY =
    Constants.expoConfig?.extra?.GEMINI_API_KEY ;
    // console.log("Gemeni Key:", GEMINI_API_KEY);
  try {
    const base64Image = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image,
              },
            },
            {
              text: `Extract this receipt info as JSON: merchant, datetime, items (name + price),vat,subtotal, total, location. Return only JSON.`,
            },
          ],
        },
      ],
    };


    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    console.log("Gemini Raw Response:", JSON.stringify(result, null, 2)); // 🔍 DEBUG

    const textResponse =
      result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!textResponse) {
      throw new Error("Empty response from Gemini");
    }

    // Clean up the response to remove the markdown code block:
    const cleanedResponse = textResponse.replace(/^```json|```$/g, "").trim();

    // Now parse the cleaned-up JSON
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Receipt extraction failed:", error);
    throw new Error("Failed to extract receipt data.");
  }
}
