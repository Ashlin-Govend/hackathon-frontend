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
import LearnWithKwethuIcon from "@/components/icons/LearnWithKwethu";
import CurvedTextButton from "@/components/ui/curved-text-button";

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
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
      }}
      className="flex flex-col justify-between"
    >
      {/* Hero Section */}
      <div className="relative isolate pt-12">
        <div className="w-full flex justify-center">
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            className="w-48 sm:w-48 md:w-64 lg:w-80 xl:w-80"
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
      <div className="flex flex-col items-center space-y-4 pb-8 sm:absolute sm:inset-x-0 sm:bottom-0">
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <Link href="/play">
            <div className="flex flex-row items-center space-x-2 px-10 py-4 rounded-lg bg-white shadow-md hover:bg-gray-100">
              <img
                src="/assets/images/game-modified.png"
                alt="Game Icon"
                className="w-10 h-10"
              />
              <span className="text-xl font-semibold text-gray-800">
                Play Games
              </span>
            </div>
          </Link>
          <Link href="/learn">
            <div className="flex flex-row items-center space-x-2 px-10 py-4 rounded-lg bg-white shadow-md hover:bg-gray-100">
              <img
                src="/assets/images/brains-modified.png"
                alt="Brain Icon"
                className="w-10 h-10"
              />
              <span className="text-xl font-semibold text-gray-800">
                Learn More
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
