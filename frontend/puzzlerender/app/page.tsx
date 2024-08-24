import Image from "next/image";
import Intro from "./components/Intro";
import NewsLetter from "./components/NewsLetter";
import PuzzleSection from "./components/PuzzleSection";
import HowTo from "./components/HowTo";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Intro />
      <PuzzleSection />
      <HowTo />
      <NewsLetter />
    </main>
  );
}
