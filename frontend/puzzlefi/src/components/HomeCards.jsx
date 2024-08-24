import Card from "./Card";
import { Link } from "react-router-dom";

function HomeCards() {
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Why Choose Our Puzzle Generator?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card>
            <h2 className="text-2xl font-bold">Instant Puzzle Creation</h2>
            <p className="mt-2 mb-4">
              Generate custom puzzles with just a few clicks. Choose your puzzle
              type, set your preferences, and watch as your personalized puzzle
              is created in seconds.
            </p>
          </Card>
          <Card bg="bg-indigo-100">
            <h2 className="text-2xl font-bold">High-Quality PDF Rendering</h2>
            <p className="mt-2 mb-4">
              Get your puzzles and clues in professionally formatted PDFs.
              Perfect for printing or sharing, ensuring your puzzles look great
              every time.
            </p>
          </Card>
          <Card bg="bg-indigo-100">
            <h2 className="text-2xl font-bold">Puzzle History & Management</h2>
            <p className="mt-2 mb-4">
              Easily manage and track your past puzzles. With a user-friendly
              dashboard, you can revisit and download any puzzles you've created
              before.
            </p>
          </Card>
          <Card>
            <h2 className="text-2xl font-bold">Download Anytime, Anywhere</h2>
            <p className="mt-2 mb-4">
              Access and download any puzzle you've previously generated,
              whenever you need it. Whether it's the puzzle itself or just the
              clues, you can download them separately as per your needs.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default HomeCards;
