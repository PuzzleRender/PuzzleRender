import PuzzleCard from "../components/PuzzleCard";

const page = () => {
  return (
    <div className="min-h-screen p-10 flex flex-col items-center justify-center gap-8">
      <div>
        <h1 className="text-4xl font-bold">Puzzles</h1>
        <p className="text-muted-foreground">Choose a puzzle to play</p>
      </div>
      <div className="flex items-center justify-center gap-8">
        <PuzzleCard />
        <PuzzleCard />
        <PuzzleCard />
      </div>
    </div>
  );
};

export default page;
