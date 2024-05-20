"use server";

import "@/lib/envConfig";
import OpenAI from "openai";

export async function getChatCompletion(chat: any) {
  const OAIKey = process.env.OAI_API_KEY;
  const openai = new OpenAI({
    apiKey: OAIKey,
  });

  const completion = await openai.chat.completions.create({
    messages: chat,
    model: "gpt-3.5-turbo",
  });

  const response = completion.choices[0].message.content;

  console.log(response);

  return response;
}
