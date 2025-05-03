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

interface GradeSelectorProps {
  onSelect: (topic: string) => void;
}

export function GradeSelector({ onSelect }: GradeSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");

  // In a real app, these would be fetched from an API based on the user's learning history
  const topics = [
    // { value: "grade-1", label: "Grade 1" },
    // { value: "grade-2", label: "Grade 2" },
    { value: "grade-3", label: "Grade 3" },
    // { value: "grade-4", label: "Grade 4" },
    // { value: "grade-5", label: "Grade 5" },
    // { value: "grade-6", label: "Grade 6" },
    { value: "grade-7", label: "Grade 7" },
    // { value: "grade-8", label: "Grade 8" },
    // { value: "grade-9", label: "Grade 9" },
    // { value: "grade-10", label: "Grade 10" },
    // { value: "grade-11", label: "Grade 11" },
    // { value: "grade-12", label: "Grade 12" },
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
            : "Select a Grade..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search Grades..." className="h-9" />
          <CommandList>
            <CommandEmpty>No grades found.</CommandEmpty>
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
