"use client";

import { ComponentProps } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BellRing, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import puzzle from "@/public/intro.jpg";

const puzzleInfo = [
  {
    title: "Embark on the Sudoku Odyssey",
    description:
      "Test your wits with this legendary puzzle. Can you fill the grid with numbers without repeating any in rows, columns, or boxes?",
  },
  {
    title: "Unlock the Secrets of Sudoku",
    description:
      "Each number has its place. Your mission: find the right one. Are you up for the challenge?",
  },
  {
    title: "Master the Art of Sudoku",
    description:
      "Hone your logical thinking with this classic brain teaser. Every move counts!",
  },
];

type CardProps = ComponentProps<typeof Card>;

const PuzzleCard = ({ className, ...props }: CardProps) => {
  return (
    <div>
      <Card className={cn("w-[380px]", className)} {...props}>
        <CardHeader>
          <div className="w-full">
            <Image
              src={puzzle}
              alt="Puzzle"
              layout="responsive"
              width={150}
              height={100}
              className="object-cover"
            />
          </div>

          <CardTitle> WordSearch Puzzle</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            {puzzleInfo.map((puzzle, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {puzzle.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {puzzle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Check className="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PuzzleCard;
