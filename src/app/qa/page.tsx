"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getQuestions } from "@/actions/getQuestions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getScores } from "@/actions/getScores";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [startQuiz, setStartQuiz] = React.useState<boolean>(false);
  const [questions, setQuestions] = React.useState<any>([{}]);
  const [answers, setAnswers] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleStartQuiz = async () => {
    let questions;

    if (
      localStorage.getItem("questions") === null ||
      localStorage.getItem("questions") == ""
    ) {
      console.log("Fetching questions from API");

      const result = await getQuestions();
      localStorage.setItem("questions", result ?? "");

      questions = result ? JSON.parse(result) : null;
    }

    console.log("Fetching questions from local storage");
    questions = JSON.parse(localStorage.getItem("questions") ?? "");
    console.log(questions);

    setQuestions(questions);
    setStartQuiz(true);
    setAnswers(new Array(questions.length).fill(null));
  };

  const handleOptionChange = (
    questionIndex: number,
    option: string,
    checked: boolean
  ) => {
    setAnswers((prevAnswers: any) => {
      const newAnswers = [...prevAnswers];
      if (checked) {
        if (newAnswers[questionIndex]) {
          newAnswers[questionIndex].push(option);
        } else {
          newAnswers[questionIndex] = [option];
        }
      } else {
        newAnswers[questionIndex] = newAnswers[questionIndex].filter(
          (answer: string) => answer !== option
        );
      }

      // console.log(newAnswers);

      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formattedAnswers = questions.questions.map(
      (question: any, index: number) => ({
        question: question.question,
        answers: [answers[index]],
      })
    );

    // console.log(formattedAnswers);
    const result = await getScores(JSON.stringify(formattedAnswers));

    const scores = JSON.parse(result ?? "");
    localStorage.setItem("scores", JSON.stringify(scores));

    setLoading(false);
    router.push("/chat");
  };

  return loading ? (
    <div className="min-h-[100vh] flex flex-col gap-6 justify-center items-center">
      <p className="text-5xl">Loading...</p>
    </div>
  ) : startQuiz ? (
    <div className="min-h-[100vh] flex flex-col gap-6 justify-center items-center">
      <p className="text-2xl font-bold font-mono">QUIZ</p>
      <Carousel className="w-full max-w-lg">
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-left justify-center p-6 gap-9">
                    <p className="text-xl font-mono">
                      {questions.questions[index]?.question}
                    </p>
                    {questions.questions[index]?.options.map(
                      (option: string) => {
                        return (
                          <div className="flex items-center space-x-2 font-mono">
                            <Checkbox
                              id={`question-${index}-${option}`}
                              onCheckedChange={(checked: boolean) =>
                                handleOptionChange(index, option, checked)
                              }
                            />
                            <label
                              htmlFor={`question-${index}-${option}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {" "}
                              {option}
                            </label>
                          </div>
                        );
                      }
                    )}
                    ;
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Button
        onClick={handleSubmit}
        className="text-black font-bold py-2 px-4 rounded font-mono"
        variant={"default"}
        size={"lg"}
      >
        Submit
      </Button>
    </div>
  ) : (
    <div className="min-h-[100vh] flex flex-col gap-4 justify-center items-center">
      <h1 className="text-6xl font-bold">
        Take our skin care quiz to know your skin better
      </h1>
      <Button
        onClick={handleStartQuiz}
        className="text-black font-bold py-2 px-4 rounded font-mono"
        variant={"default"}
        size={"lg"}
      >
        Start Quiz
      </Button>
    </div>
  );
}
