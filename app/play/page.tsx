"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, ArrowRight, RefreshCw } from "lucide-react"
import { QuizGame } from "@/components/quiz-game"
import { TopicSelector } from "@/components/topic-selector"

export default function PlayPage() {
  const [selectedTopic, setSelectedTopic] = useState("")
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [score, setScore] = useState(0)

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic)
  }

  const startGame = () => {
    setGameStarted(true)
    setGameCompleted(false)
    setScore(0)
  }

  const handleGameComplete = (finalScore: number) => {
    setScore(finalScore)
    setGameCompleted(true)
  }

  const resetGame = () => {
    setSelectedTopic("")
    setGameStarted(false)
    setGameCompleted(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Knowledge Games</h1>

      {!gameStarted && !gameCompleted ? (
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Select a Topic to Play</CardTitle>
              <CardDescription>Choose a topic you've learned about to test your knowledge</CardDescription>
            </CardHeader>
            <CardContent>
              <TopicSelector onSelect={handleTopicSelect} />
            </CardContent>
            <CardFooter>
              <Button onClick={startGame} disabled={!selectedTopic} className="w-full">
                Start Game <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : gameCompleted ? (
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <CardTitle>Game Completed!</CardTitle>
              <CardDescription>You've completed the quiz on {selectedTopic}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <h3 className="text-2xl font-bold mb-4">Your Score: {score}%</h3>
              <Progress value={score} className="h-4 mb-6" />

              <div className="grid gap-4 mb-6">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-medium mb-2">What you did well:</h4>
                  <p className="text-sm text-muted-foreground">
                    {score > 70
                      ? "Great job! You have a solid understanding of the topic."
                      : "You've made a good start with understanding the basics."}
                  </p>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-medium mb-2">Areas to improve:</h4>
                  <p className="text-sm text-muted-foreground">
                    {score > 70
                      ? "Review the few questions you missed to perfect your knowledge."
                      : "Consider revisiting the learning materials to strengthen your understanding."}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={resetGame} className="w-full sm:w-auto">
                <RefreshCw className="mr-2 h-4 w-4" /> Try Another Topic
              </Button>
              <Button onClick={startGame} className="w-full sm:w-auto">
                Play Again
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <QuizGame topic={selectedTopic} onComplete={handleGameComplete} />
      )}
    </div>
  )
}
