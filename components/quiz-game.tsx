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

  useEffect(() => {
    // In a real app, you would fetch questions from an API based on the topic
    // For now, we'll generate some sample questions
    setLoading(true);
    setTimeout(() => {
      setQuestions(generateQuestions(topic));
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
              Loading questions about {topic}...
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
            <p>
              No questions available for this topic. Please try another topic.
            </p>
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
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        <div className="text-xl font-medium">
          Score: {correctAnswers}/{currentQuestionIndex + (isAnswered ? 1 : 0)}
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
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="w-full text-xl">
              {currentQuestionIndex < questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

// Helper function to generate sample questions
function generateQuestions(topic: string): Question[] {
  // In a real app, you would generate questions based on the topic using AI
  // or fetch them from a database

  // For now, we'll create some generic questions
  return [
    {
      id: 1,
      text: `What is the main concept behind living and non-living things?`,
      options: [
        `It is about classifying objects based on their usefulness to humans`,
        `It focuses on whether things can move or not`,
        `It combines both biological characteristics and environmental interaction`,
        `It is an outdated classification system`,
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: `Which of the following is NOT a characteristic of living things?`,
      options: [
        `Growth`,
        `Breathing`,
        `Reproduction`,
        `Being made of plastic`,
      ],
      correctAnswer: 3,
    },
    {
      id: 3,
      text: `How are living and non-living things typically identified in real-world scenarios?`,
      options: [
        `Only through laboratory tests`,
        `By checking if they are useful`,
        `By observing movement only`,
        `By checking for characteristics like growth and response to stimuli`,
      ],
      correctAnswer: 3,
    },
    {
      id: 4,
      text: `What is considered the foundation of understanding living and non-living things?`,
      options: [
        `Basic principles like growth, respiration, and reproduction`,
        `Knowing the names of all animals and plants`,
        `Memorizing scientific terms`,
        `Reading about the history of biology`,
      ],
      correctAnswer: 0,
    },
    {
      id: 5,
      text: `Which field is most closely related to the study of living and non-living things?`,
      options: [
        `Mathematics`,
        `History`,
        `Biology`,
        `Geography`,
      ],
      correctAnswer: 2,
    },
    ];
  }
