"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface GradeSelectorProps {
  onSelect: (topic: string) => void;
}

export function GradeSelector({ onSelect }: GradeSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const t = useTranslations("Selectors.GradeSelector");

  // Topics are now translated using the JSON fields
  const topics = [
    { value: "grade-3", label: t("grades.grade3") },
    { value: "grade-7", label: t("grades.grade7") },
  ];

  const handleSelect = (topic: string) => {
    setSelectedTopic(topic);
    onSelect(topic);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-xl"
        >
          {selectedTopic
            ? topics.find((topic) => topic.value === selectedTopic)?.label
            : t("placeholder")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={t("searchPlaceholder")} className="h-9" />
          <CommandList>
            <CommandEmpty>{t("emptyState")}</CommandEmpty>
            <CommandGroup>
              {topics.map((topic) => (
                <CommandItem
                  key={topic.value}
                  value={topic.value}
                  onSelect={() => handleSelect(topic.value)}
                >
                  {topic.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedTopic === topic.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
