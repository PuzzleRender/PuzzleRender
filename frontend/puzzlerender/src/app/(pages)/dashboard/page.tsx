import Image from "next/image";
import { GoPlusCircle } from "react-icons/go";
import { LuPlay } from "react-icons/lu";
import { FiArchive } from "react-icons/fi";

export const puzzles = [
  {
    title: "Sudoku",
    subtitle: "Last used 2 days ago",
    icon: GoPlusCircle,
    image: "/puzzle.svg",
  },
  {
    title: "Sudoku",
    subtitle: "Last used 2 days ago",
    icon: GoPlusCircle,
    image: "/puzzle.svg",
  },
  {
    title: "Sudoku",
    subtitle: "Last used 2 days ago",
    icon: GoPlusCircle,
    image: "/puzzle.svg",
  },
  {
    title: "Sudoku",
    subtitle: "Last used 2 days ago",
    icon: GoPlusCircle,
    image: "/puzzle.svg",
  },
  {
    title: "Sudoku",
    subtitle: "Last used 2 days ago",
    icon: GoPlusCircle,
    image: "/puzzle.svg",
  },
  {
    title: "Sudoku",
    subtitle: "Last used 2 days ago",
    icon: GoPlusCircle,
    image: "/puzzle.svg",
  },
  {
    title: "Sudoku",
    subtitle: "Last used 2 days ago",
    icon: GoPlusCircle,
    image: "/puzzle.svg",
  },
  {
    title: "Sudoku",
    subtitle: "Last used 2 days ago",
    icon: GoPlusCircle,
    image: "/puzzle.svg",
  },
  {
    title: "Sudoku",
    subtitle: "Last used 2 days ago",
    icon: GoPlusCircle,
    image: "/puzzle.svg",
  },
];
export default function Home() {
  const dashboardOptions = [
    {
      title: "Create New Game",
      subtitle: "Create and Export",
      icon: GoPlusCircle,
      link: "/create",
    },
    {
      title: "Puzzle Templates",
      subtitle: "Quick Start",
      icon: LuPlay,
      link: "/projects",
    },
    {
      title: "Import",
      subtitle: "Bring in external files",
      icon: FiArchive,
      link: "/archive",
    },
  ];

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center justify-center space-y-7">
      <div className="flex gap-4 mt-16 flex-wrap">
        {dashboardOptions.map((option, index) => (
          <div
            key={index}
            className="w-full md:w-[328px] flex items-center justify-start p-5 border-b border-b-gray-300 bg-[#F5F5F5] rounded-md"
          >
            <div className="flex items-center flex-row justify-between gap-3 w-full">
              <div>
                <h3 className="font-medium text-lg">{option.title}</h3>
                <p className="text-sm text-gray-400">{option.subtitle}</p>
              </div>
              <option.icon className="text-4xl text-white p-2 bg-[#023E8A] rounded-full font-bold" />
            </div>
          </div>
        ))}
      </div>
      <div className="w-full px-10 space-y-6">
        <div className="flex justify-between w-full items-center">
          <h2 className="text-xl font-medium">Recent puzzles</h2>
          <h2 className="text-xl font-medium">Drafts</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full overflow-scroll">
          {puzzles.map((puzzle, index) => (
            <div key={index} className="flex flex-col">
              <Image
                src={puzzle.image}
                alt={puzzle.title}
                width={328}
                height={200}
              />
              <div>
                <h3>{puzzle.title}</h3>
                <p>{puzzle.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
