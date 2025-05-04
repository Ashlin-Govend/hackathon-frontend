"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BookOpen, MessageSquare } from "lucide-react";
import { LearningMaterials } from "@/components/learning-materials";
import { ChatMessage } from "@/components/chat-message";
import { useTranslations } from "next-intl";

export default function LearnPage() {
  const t = useTranslations("LearnPage");

  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState<
    { id: string; role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("English");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          language,
        }),
      });

      const assistantReply = await res.json();

      const assistantMessage = {
        id: assistantReply.id,
        role: assistantReply.role,
        content: assistantReply.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Failed to fetch assistant response", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 bg-[#ffffff] text-gray-900">
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

      <div className="mb-6 text-2xl">
        <label htmlFor="language" className="font-semibold mr-4">
          Language:
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-[#c49014] rounded p-2 text-lg"
        >
          <option value="English">English</option>
          <option value="Zulu">Zulu</option>
          <option value="Afrikaans">Afrikaans</option>
          <option value="Xhosa">Xhosa</option>
          <option value="Sesotho">Sesotho</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="col-span-1 lg:col-span-2">
          <CardContent className="p-6 h-[650px]">
            <div className="flex flex-col h-full">
              <div className="flex-grow overflow-auto mb-4 space-y-4 text-2xl">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <MessageSquare className="h-14 w-14 text-[#086ea3] mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">
                      {t("chat.emptyState.title")}
                    </h3>
                    <p className="text-muted-foreground max-w-xl text-lg">
                      {t("chat.emptyState.description")}
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))
                )}
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex items-center space-x-4"
              >
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder={t("chat.placeholder")}
                  disabled={isLoading}
                  className="flex-grow text-2xl placeholder:text-xl py-4 border border-[#c49014]"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-4 text-2xl font-semibold bg-[#c49014] hover:bg-[#b27f0f] text-white"
                >
                  {isLoading ? t("chat.thinking") : t("chat.askButton")}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-1 h-[600px] overflow-y-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full text-lg h-full"
          >
            <TabsList className="grid w-full grid-cols-2 text-lg bg-white border border-[#c49014]">
              <TabsTrigger value="chat">{t("tabs.chat")}</TabsTrigger>
              <TabsTrigger value="materials">{t("tabs.materials")}</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-[#c49014]">
                    {t("chatTips.title")}
                  </h3>
                  <ul className="space-y-2 text-base">
                    <li>• {t("chatTips.tips.tip1")}</li>
                    <li>• {t("chatTips.tips.tip2")}</li>
                    <li>• {t("chatTips.tips.tip3")}</li>
                    <li>• {t("chatTips.tips.tip4")}</li>
                    <li>• {t("chatTips.tips.tip5")}</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="materials" className="mt-4 text-2xl">
              {messages.some((m) => m.role === "assistant") ? (
                <div className="overflow-y-auto max-h-[520px] pr-2">
                  <LearningMaterials messages={messages} language={language} />
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-14 w-14 text-[#086ea3] mx-auto mb-4" />
                    <h3 className="text-2xl font-medium mb-2">
                      {t("materials.emptyState.title")}
                    </h3>
                    <p className="text-muted-foreground text-2xl">
                      {t("materials.emptyState.description")}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
