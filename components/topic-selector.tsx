"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface TopicSelectorProps {
  onSelect: (topic: string) => void
}

export function TopicSelector({ onSelect }: TopicSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState("")

  // In a real app, these would be fetched from an API based on the user's learning history
  const topics = [
    { value: "mathematics", label: "Mathematics" },
    { value: "physics", label: "Physics" },
    { value: "biology", label: "Biology" },
    { value: "chemistry", label: "Chemistry" },
    { value: "history", label: "History" },
    { value: "literature", label: "Literature" },
    { value: "computer-science", label: "Computer Science" },
    { value: "astronomy", label: "Astronomy" },
    { value: "geography", label: "Geography" },
    { value: "psychology", label: "Psychology" },
  ]

  const handleSelect = (topic: string) => {
    setSelectedTopic(topic)
    onSelect(topic)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selectedTopic ? topics.find((topic) => topic.value === selectedTopic)?.label : "Select a topic..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search topics..." className="h-9" />
          <CommandList>
            <CommandEmpty>No topics found.</CommandEmpty>
            <CommandGroup>
              {topics.map((topic) => (
                <CommandItem key={topic.value} value={topic.value} onSelect={() => handleSelect(topic.value)}>
                  {topic.label}
                  <Check
                    className={cn("ml-auto h-4 w-4", selectedTopic === topic.value ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
