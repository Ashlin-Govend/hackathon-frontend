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

const bg = "/assets/images/bg.png";

const languages = [
  { code: "en", label: "English" },
  { code: "zu", label: "Zulu" },
  { code: "af", label: "Afrikaans" },
  { code: "xh", label: "Xhosa" },
];

function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("English");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (lang: string) => {
    setSelected(lang);
    setIsOpen(false);
    // Here you could also trigger a language switch logic
  };

  return (
    <div className="absolute top-6 left-6 z-50">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-200 transition"
        >
          <img
            src="translation.png" // Replace with your actual image path
            alt="Language"
            className="w-8 h-8"
          />
        </button>

        {isOpen && (
          <div className="absolute top-16 left-0 bg-white shadow-lg rounded-lg p-2 w-40 animate-fade-in">
            {languages.map((lang) => (
              <div
                key={lang.code}
                onClick={() => handleSelect(lang.label)}
                className="cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              >
                {lang.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  const t = useTranslations("HomePage");
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
      className="flex flex-col justify-between relative"
    >
      <LanguageSelector />

      {/* Hero Section */}
      <div className="relative isolate pt-12">
        <div className="w-full flex justify-center">
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            className="w-48 sm:w-48 md:w-64 lg:w-80 xl:w-80"
          />
        </div>

        <div className="lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-7xl pt-2 font-extrabold tracking-tight text-white sm:text-6xl">
                {t("title")}
              </h1>
              <p className="mt-6 text-4xl leading-8 text-center text-white">
                {t("description")}
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

      {/* Buttons */}
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
                {t("playGameButton")}
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
                {t("learnMoreButton")}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
