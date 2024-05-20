"use client";

import * as React from "react";
import { TypewriterEffect } from "@/components/typewriter";
import { Input } from "@/components/ui/input";
import { getChatCompletion } from "@/actions/getChatCompletion";

export default function Page() {
  const [scores, setScores] = React.useState<any>({
    skinType: 0,
    texture: 0,
    hydration: 0,
    lesions: 0,
    inflammation: 0,
    scarring: 0,
  });
  const [summary, setSummary] = React.useState<string>("");
  const [routine, setRoutine] = React.useState<any>({
    monday: { morning: [], evening: [] },
    tuesday: { morning: [], evening: [] },
    wednesday: { morning: [], evening: [] },
    thursday: { morning: [], evening: [] },
    friday: { morning: [], evening: [] },
    saturday: { morning: [], evening: [] },
    sunday: { morning: [], evening: [] },
  });
  const [ingredients, setIngredients] = React.useState<any>({
    "Ingredient 1": {
      purpose: "",
      howToUse: "",
      benefits: "",
    },
    "Ingredient 2": {
      purpose: "",
      howToUse: "",
      benefits: "",
    },
  });
  const [chat, setChat] = React.useState<any>([]);

  React.useEffect(() => {
    const localData = localStorage.getItem("scores");

    if (localData === null || localData === "") {
      console.log("No scores found in local storage");
      return;
    }

    const localDataJSON = JSON.parse(localData);

    console.log(localDataJSON);
    let userchat;

    if (
      localStorage.getItem("userchat") === null ||
      localStorage.getItem("userchat") === ""
    ) {
      userchat = JSON.stringify([
        {
          role: "system",
          content: localDataJSON.summary,
        },
      ]);
    } else {
      console.log("User chat found in local storage");
      userchat = localStorage.getItem("userchat");
      userchat = JSON.parse(userchat || "");
    }

    localStorage.setItem("userchat", JSON.stringify(userchat));

    setScores(localDataJSON.scores);
    setSummary(localDataJSON.summary);
    setRoutine(localDataJSON.routine);
    setIngredients(localDataJSON.ingredients);
    setChat(userchat);
  }, []);

  const handleEnterKey = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const newChat = { role: "user", content: event.currentTarget.value };
      let updatedChat = [...chat, newChat];
      localStorage.setItem("userchat", JSON.stringify(updatedChat));
      event.currentTarget.value = "";
      const response = await getChatCompletion(updatedChat);
      updatedChat = [...updatedChat, { role: "system", content: response }];
      localStorage.setItem("userchat", JSON.stringify(updatedChat));
      setChat(updatedChat);
    }
  };

  return (
    <div className="container flex-col justify-around">
      <div className="text-3xl text-center mt-7 font-mono">AI chat bot</div>
      <div className="text-left text-wrap text-2xl mt-6">
        <TypewriterEffect
          words={summary.split(" ").map((word) => {
            return { text: word, className: "" };
          })}
        />
      </div>

      <br />

      <div className="text-xl font-bold font-mono">Suggested Routine:</div>
      <ul>
        {Object.keys(routine).map((day) => (
          <li key={day}>
            <div className="font-mono font-extrabold mt-5">{day}</div>
            <ul>
              <li className="font-mono flex justify-start">
                Morning:
                <ul className=" flex justify-start">
                  {routine[day].morning.map((ingredient: string) => (
                    <li className="font-mono" key={ingredient}>
                      {"   "}
                      {ingredient}
                      {",  "}
                    </li>
                  ))}
                </ul>
              </li>
              <li className="font-mono flex justify-start">
                Evening:
                <ul className=" flex justify-start">
                  {routine[day].evening.map((ingredient: string) => (
                    <li className="font-mono" key={ingredient}>
                      {"   "}
                      {ingredient}
                      {",  "}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </li>
        ))}
      </ul>

      <br />

      <div className="text-xl font-bold font-mono">Ingredients:</div>
      <ul>
        {Object.keys(ingredients).map((ingredient) => (
          <li key={ingredient}>
            <div className="font-mono font-extrabold mt-5">{ingredient}</div>
            <ul>
              <li className="font-mono">
                Purpose: {ingredients[ingredient].purpose}
              </li>
              <li className="font-mono">
                How to use: {ingredients[ingredient].howToUse}
              </li>
              <li className="font-mono">
                Benefits: {ingredients[ingredient].benefits}
              </li>
            </ul>
          </li>
        ))}
      </ul>

      <br />

      <div className="text-xl font-bold font-mono">Chat:</div>
      <ul>
        {chat.map((message: any, index: number) => (
          <li
            key={index}
            className={`font-mono ${
              message.role === "system" ? "text-left" : "text-right"
            }`}
          >
            {message.content}
          </li>
        ))}
      </ul>

      <br />

      <Input
        className="font-mono text-xl mb-12"
        onKeyDown={handleEnterKey}
      ></Input>
    </div>
  );
}
