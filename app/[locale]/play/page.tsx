"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, ArrowRight, RefreshCw } from "lucide-react";
import { QuizGame } from "@/components/quiz-game";
import { TopicSelector } from "@/components/topic-selector";
import { GradeSelector } from "@/components/grade-selector";
import { SubjectSelector } from "@/components/subject-selector";

export default function PlayPage() {
  const t = useTranslations("GamePage");

  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
  };
  const handleGradeSelect = (topic: string) => {
    setSelectedGrade(topic);
  };
  const handleSubjectSelect = (topic: string) => {
    setSelectedSubject(topic);
  };

  const startGame = () => {
    if (selectedGrade == "grade-3") {
      window.open(
        "https://aikwetu-2.vercel.app",
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }
    setGameStarted(true);
    setGameCompleted(false);
    setScore(0);
  };

  const handleGameComplete = (finalScore: number) => {
    setScore(finalScore);
    setGameCompleted(true);
  };

  const resetGame = () => {
    setSelectedTopic("");
    setSelectedGrade("");
    setSelectedSubject("");
    setGameStarted(false);
    setGameCompleted(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          onClick={() => (window.location.href = "/")}
          className="mr-4"
        >
          <ArrowRight className="mr-2 h-4 w-8 rotate-180" />
        </Button>
        <h1 className="text-3xl font-bold">{t("title")}</h1>
      </div>

      {!gameStarted && !gameCompleted ? (
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">
                {t("preferences.title")}
              </CardTitle>
              <CardDescription className="text-xl">
                {t("preferences.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <GradeSelector onSelect={handleGradeSelect} />
                <SubjectSelector onSelect={handleSubjectSelect} />
                <TopicSelector onSelect={handleTopicSelect} />
              </div>
            </CardContent>

            <CardFooter>
              <Button
                onClick={startGame}
                disabled={!selectedTopic || !selectedGrade || !selectedSubject}
                className="w-full text-2xl "
              >
                {t("preferences.startButton")}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : gameCompleted ? (
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <CardTitle className="text-3xl">
                {t("gameCompleted.title")}
              </CardTitle>
              <CardDescription className="text-lg">
                {t("gameCompleted.description", { topic: selectedTopic })}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                {t("gameCompleted.scoreTitle", { score })}
              </h3>
              <Progress value={score} className="h-4 mb-6" />

              <div className="grid gap-4 mb-6">
                <div className="p-4 bg-primary/10 rounded-lg text-xl">
                  <h4 className="font-medium mb-2">
                    {t("gameCompleted.whatYouDidWell.title")}
                  </h4>
                  <p className="text-lg text-muted-foreground">
                    {score > 70
                      ? t("gameCompleted.whatYouDidWell.highScoreMessage")
                      : t("gameCompleted.whatYouDidWell.lowScoreMessage")}
                  </p>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg text-xl">
                  <h4 className="font-medium mb-2">
                    {t("gameCompleted.areasToImprove.title")}
                  </h4>
                  <p className="text-lg text-muted-foreground">
                    {score > 70
                      ? t("gameCompleted.areasToImprove.highScoreMessage")
                      : t("gameCompleted.areasToImprove.lowScoreMessage")}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                onClick={resetGame}
                className="w-full sm:w-auto text-xl"
              >
                <RefreshCw className="mr-2 h-4 w-4" />{" "}
                {t("gameCompleted.tryAnotherTopicButton")}
              </Button>
              <Button onClick={startGame} className="w-full sm:w-auto text-xl">
                {t("gameCompleted.playAgainButton")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <QuizGame topic={selectedTopic} onComplete={handleGameComplete} />
      )}
    </div>
  );
}
