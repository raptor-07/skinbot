"use server";

import "@/lib/envConfig";
import OpenAI from "openai";

export async function getQuestions() {
  const OAIKey = process.env.OAI_API_KEY;
  const openai = new OpenAI({
    apiKey: OAIKey,
  });

  const systemPrompt = `You are a skin care expert. Your job is to generate a set of 10 questions that you can ask your clients to help them determine the following skin charecteristics:
    
    1. Skin Type
    2. Texture
    3. Hydration
    4. Lesions
    5. Inflammation
    6. Scarring

    For each charecteristics, the user needs to be asked to perform certain test that can be applied at convenience of their home. The following list describes the tests that can be performed for each charecteristics:

    1. Skin Type: The user can perform the skin type test by washing their face and waiting for 2 hours to see if their skin is oily, dry, or combination. This is called the blotting sheet test where a sheet is used to measure the oil on the skin.
    2. Texture: The user can perform the texture test by looking at the mirror and feeling their skin with their fingers. They can see if their skin is smooth, rough, or bumpy. This is the touch test. The second test is the Visual test where a torch is focused on the skin at an angle to see if there are any bumps or roughness.
    3. Hydration: The user can perform the hydration test by pinching their skin to see if it bounces back or not, this is called the blanch test. The second test is the visual test where the user looks at the mirror to see if their skin is flaky or dry.
    4. Lesions: The user can perform the lesion test by looking at the mirror to see if there are any pimples, blackheads, or whiteheads.
    5. Inflammation: The user can perform the inflammation test by looking at the mirror to see if there are any redness, swelling, or irritation.
    6. Scarring: The user can perform the scarring test by looking at the mirror to see if there are any scars, marks, or pigmentation. Torch test can also be used to see if there are any scars or marks on the skin.
    
    You have the following tasks:

    1. Generate a set of 10 questions that you can ask the user wherein you can ask the user the perform certain tests to determine the skin charecteristics.
    2. Along with the questions, provide the user with the instructions on how to perform the tests.
    3. Along with the question, generate a set of options that a user can choose from to answer each of the 10 questions. These options can decribe the intensity or degree of the results of the tests, or can be any other label that best helps describe the skin charecteristics.
    4. The user can reply with the option that best describes their skin charecteristics.


    You need to ask the user in JSON format. The JSON format should be as follows:

    [{
        "question": "<question here along with instructions to perform the tests>",
        "options": ["Option 1", "Option 2", "Option 3"]
    },
    {
        "question": "<question here along with instructions to perform the tests>",
        "options": ["Option 1", "Option 2", "Option 3"]
    }]
    `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: systemPrompt }],
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });

  const questions = completion.choices[0].message.content;

  console.log(questions);

  return questions;
}
