"use server";

import "@/lib/envConfig";
import OpenAI from "openai";

export async function getScores(answers: string) {
  const OAIKey = process.env.OAI_API_KEY;
  const openai = new OpenAI({
    apiKey: OAIKey,
  });

  const systemPrompt = `You are a skincare expert. Your job is to evaluate the following charecteristics of a users skin:
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

    Based on these tests, the user is asked a set of 10 questions to determine the charecteristics of their skin.

    Here are the questions along with their answers from the user:

    ${answers}

    Here are the tasks you need to perform:

    1. Evaluate the answers provided by the user and for each charecteristics, provide a score based on the answers provided by the user between 0 - 10.
    For scoring, you need to consider the interdependency of the charecteristics. For example, if the user has oily skin, they are more likely to have acne or inflammation. If the user has dry skin, they are more likely to have scarring or rough texture. Here is a graph that shows relationships:
        a. If hydration is low, skin type is more likely to be dry. Hence, you can be more sure if the user has already mentioned that their skin is dry. If not, you can remove some points from the hydration score to discount the underconfidence.
        b. If the user has oily skin, they are more likely to have acne or inflammation. Hence, if the user has mentioned that they have oily skin, you can increase the score for acne and inflammation.
        c. If the user has dry skin, they are more likely to have scarring or rough texture. Hence, if the user has mentioned that they have dry skin, you can increase the score for scarring and texture.
        d. If the user has lesions, they are more likely to have inflammation. Hence, if the user has mentioned that they have lesions, you can increase the score for inflammation.
        e. If the user has inflammation, they are more likely to have lesions. Hence, if the user has mentioned that they have inflammation, you can increase the score for lesions.
        f. If the user has scarring, they are more likely to have rough texture. Hence, if the user has mentioned that they have scarring, you can increase the score for texture.
    2. Provide a summary of the scores for each charecteristics.
    3. Provide a weekly skin routine along with ingredients that can help improve the skin charecteristics based on the scores provided by the user. Explain the purpose of these ingredients and how they can help improve the skin charecteristics.

    Reply in a JSON format with the following structure:
    
    {
        scores: {
            "skinType": 8,
            "texture": 6,
            "hydration": 7,
            "lesions": 5,
            "inflammation": 4,
            "scarring": 3
        },
        summary: "Based on the scores provided by the user, here is a summary of the skin charecteristics of the user.",
        routine: {
            monday: {
                morning: ["Ingredient 1", "Ingredient 2"],
                evening: ["Ingredient 1", "Ingredient 2"]
            },
            tuesday: {
                morning: ["Ingredient 1", "Ingredient 2"],
                evening: ["Ingredient 1", "Ingredient 2"]
            },
            wednesday: {
                morning: ["Ingredient 1", "Ingredient 2"],
                evening: ["Ingredient 1", "Ingredient 2"]
            },
            thursday: {
                morning: ["Ingredient 1", "Ingredient 2"],
                evening: ["Ingredient 1", "Ingredient 2"]
            },
            friday: {
                morning: ["Ingredient 1", "Ingredient 2"],
                evening: ["Ingredient 1", "Ingredient 2"]
            },
            saturday: {
                morning: ["Ingredient 1", "Ingredient 2"],
                evening: ["Ingredient 1", "Ingredient 2"]
            },
            sunday: {
                morning: ["Ingredient 1", "Ingredient 2"],
                evening: ["Ingredient 1", "Ingredient 2"]
            }
        },
        ingredients: {
            "Ingredient 1": {
                purpose: "Purpose of the ingredient",
                howToUse: "How to use the ingredient",
                benefits: "Benefits of the ingredient"
            },
            "Ingredient 2": {
                purpose: "Purpose of the ingredient",
                howToUse: "How to use the ingredient",
                benefits: "Benefits of the ingredient"
            }
        }
    }
  `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: systemPrompt }],
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });

  const scores = completion.choices[0].message.content;

  console.log(scores);

  return scores;
}
