"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface QuizGameProps {
  topic: string;
  onComplete: (score: number) => void;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export function QuizGame({ topic, onComplete }: QuizGameProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("QuizGame");

  useEffect(() => {
    // In a real app, you would fetch questions from an API based on the topic
    // For now, we'll generate some sample questions
    setLoading(true);
    setTimeout(() => {
      setQuestions(generateQuestions(topic, t));
      setLoading(false);
    }, 1000);
  }, [topic]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / questions.length) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;

    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz completed
      const finalScore = Math.round(
        ((correctAnswers +
          (selectedOption === currentQuestion.correctAnswer ? 1 : 0)) /
          questions.length) *
          100
      );
      onComplete(finalScore);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-primary/20 rounded w-3/4 mx-auto"></div>
              <div className="h-32 bg-primary/10 rounded"></div>
              <div className="space-y-2">
                <div className="h-5 bg-primary/20 rounded"></div>
                <div className="h-5 bg-primary/20 rounded"></div>
                <div className="h-5 bg-primary/20 rounded"></div>
              </div>
            </div>
            <p className="mt-4 text-muted-foreground">
              {t("loading.description")} {topic}...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <p>{t("noQuestions.description")}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <span className="text-xl font-medium">
            {t("progress.question")} {currentQuestionIndex + 1} of{" "}
            {questions.length}
          </span>
        </div>
        <div className="text-xl font-medium">
          {t("progress.score")}: {correctAnswers}/
          {currentQuestionIndex + (isAnswered ? 1 : 0)}
        </div>
      </div>

      <Progress value={progress} className="h-2 mb-6" />

      <Card>
        <CardHeader>
          <CardTitle>{currentQuestion.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedOption?.toString()} className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer ${
                  isAnswered && index === currentQuestion.correctAnswer
                    ? "border-green-500 bg-green-50"
                    : isAnswered &&
                      index === selectedOption &&
                      index !== currentQuestion.correctAnswer
                    ? "border-red-500 bg-red-50"
                    : ""
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  checked={selectedOption === index}
                  disabled={isAnswered}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-grow cursor-pointer text-xl"
                >
                  {option}
                </Label>
                {isAnswered && index === currentQuestion.correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {isAnswered &&
                  index === selectedOption &&
                  index !== currentQuestion.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          {!isAnswered ? (
            <Button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              className="w-full text-xl"
            >
              {t("buttons.checkAnswer")}
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="w-full text-xl">
              {currentQuestionIndex < questions.length - 1
                ? t("buttons.nextQuestion")
                : t("buttons.finishQuiz")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

// Helper function to generate sample questions
function generateQuestions(
  topic: string,
  t: (key: string) => string
): Question[] {
  return [
    {
      id: 1,
      text: t("questions.question1.text"),
      options: [
        t("questions.question1.option1"),
        t("questions.question1.option2"),
        t("questions.question1.option3"),
        t("questions.question1.option4"),
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: t("question2.text"),
      options: [
        t("questions.question2.option1"),
        t("questions.question2.option2"),
        t("questions.question2.option3"),
        t("questions.question2.option4"),
      ],
      correctAnswer: 3,
    },
    {
      id: 3,
      text: t("questions.question3.text"),
      options: [
        t("questions.question3.option1"),
        t("questions.question3.option2"),
        t("questions.question3.option3"),
        t("questions.question3.option4"),
      ],
      correctAnswer: 3,
    },
    {
      id: 4,
      text: t("questions.question4.text"),
      options: [
        t("questions.question4.option1"),
        t("questions.question4.option2"),
        t("questions.question4.option3"),
        t("questions.question4.option4"),
      ],
      correctAnswer: 0,
    },
    {
      id: 5,
      text: t("questions.question5.text"),
      options: [
        t("questions.question5.option1"),
        t("questions.question5.option2"),
        t("questions.question5.option3"),
        t("questions.question5.option4"),
      ],
      correctAnswer: 2,
    },
  ];
}
