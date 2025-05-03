"use client";

import { useState } from "react";
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
import { Dialog, DialogPanel } from "@headlessui/react";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];
const bg = "/assets/images/bg.png"; // directly referencing from the public folder

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Hero Section */}
      <div className="relative isolate pt-12">
        <div className="w-full flex justify-center">
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            className="sm:w-32 lg:w-64"
          />
        </div>

        <div className=" lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-7xl pt-2 font-extrabold tracking-tight text-white sm:text-6xl">
                Boost Your Child's Future
              </h1>
              <p className="mt-6 text-4xl leading-8 text-center text-white">
                Unlocking Potential: Your Partner in Cultivating Your Child's
                Educational Journey
              </p>
              <div className="mt-8">
                
              </div>
              <div className="flex justify-center mt-4">
                <img
                  src="/assets/images/hero.png"
                  alt="Hero Image"
                  className="w-full sm:max-w-5xl lg:max-w-8xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Content */}
      <div className="container mx-auto px-4 py-12">
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
                Reinforce what you've learned through fun, interactive games
                that adapt to your knowledge level.
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
      </div>
    </div>
  );
}
