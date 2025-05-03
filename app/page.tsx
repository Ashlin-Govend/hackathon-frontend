import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, Gamepad2Icon as GameController2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        {/* <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Learn Smarter with AI
        </h1> */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          AI KWEthu
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Ask questions, get personalized learning materials, and test your
          knowledge through interactive games.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card className="flex flex-col h-full">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>AI Learning Assistant</CardTitle>
            <CardDescription>
              Ask questions about any topic and get AI-generated answers and
              learning materials
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">
              Our AI assistant provides detailed explanations, examples, and
              related resources to help you understand any concept.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/learn" className="w-full">
              <Button className="w-full">Start Learning</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <GameController2 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Knowledge Games</CardTitle>
            <CardDescription>
              Test your understanding with interactive quizzes and games
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">
              Reinforce what you've learned through fun, interactive games that
              adapt to your knowledge level.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/play" className="w-full">
              <Button className="w-full" variant="outline">
                Play & Learn
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="font-bold">1</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Ask a Question</h3>
            <p className="text-muted-foreground">
              Type any question about a topic you want to learn
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="font-bold">2</span>
            </div>
            <h3 className="text-lg font-medium mb-2">
              Get Personalized Learning
            </h3>
            <p className="text-muted-foreground">
              Receive AI-generated explanations and related materials
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="font-bold">3</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Test Your Knowledge</h3>
            <p className="text-muted-foreground">
              Play interactive games to reinforce what you've learned
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
