import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "../components/Card";
import { useAuth } from "../components/AuthContext";
import { Navigate } from "react-router-dom";

const DashboardPage = ({ generatePuzzle, fetchPuzzleHistory }) => {
  const { isAuthenticated, loading } = useAuth();
  const [puzzleHistory, setPuzzleHistory] = useState([]);

  // const [puzzleHistory, setPuzzleHistory] = useState([
  //   {
  //     id: 1,
  //     created_at: "2023-05-15T10:30:00Z",
  //     puzzle_url: "/api/puzzles/1/download",
  //     clue_url: "/api/puzzles/1/clue",
  //   },
  //   {
  //     id: 2,
  //     created_at: "2023-05-14T14:45:00Z",
  //     puzzle_url: "/api/puzzles/2/download",
  //     clue_url: "/api/puzzles/2/clue",
  //   },
  // ]);

  useEffect(() => {
    // console.log("yes we are authenticated....");
    loadPuzzleHistory();
  }, [isAuthenticated]);

  const loadPuzzleHistory = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch("http://127.0.0.1:8000/user-puzzles/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load puzzle");
      }

      const result = await response.json();

      // Sort the puzzles by created_at in descending order
      const sortedPuzzles = result.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setPuzzleHistory(sortedPuzzles);
    } catch (error) {
      toast.error("Failed to load puzzle history");
    }
  };

  const handleGeneratePuzzle = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch("http://127.0.0.1:8000/generate/15", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      loadPuzzleHistory();
      if (!response.ok) {
        throw new Error("Failed to generate puzzle");
      }

      const result = await response.json();
      console.log(result);
      toast.success("Puzzle generated successfully!");
      loadPuzzleHistory();
    } catch (error) {
      toast.error("Failed to generate puzzle");
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2 mt-6 ml-2">Dashboard</h1>

        <div className="my-12 text-center">
          <button
            onClick={handleGeneratePuzzle}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg text-lg mb-6"
          >
            Generate New Puzzle
          </button>
        </div>

        <section className="bg-blue-50 px-4 py-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Puzzle History</h2>
            <button
              onClick={loadPuzzleHistory} // Refresh button functionality
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg text-lg mr-6"
            >
              Refresh
            </button>
          </div>

          <Card>
            {puzzleHistory.map((puzzle) => (
              <div key={puzzle.id} className="border rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">
                  Puzzle #{puzzle.id}
                </h3>
                <p className="mb-4">
                  Created: {new Date(puzzle.created_at).toLocaleString()}
                </p>
                <div className="flex justify-between">
                  <a
                    href={puzzle.puzzle_url}
                    className="bg-indigo-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    download
                  >
                    Download Puzzle
                  </a>
                  <a
                    href={puzzle.clue_url}
                    className="bg-indigo-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    download
                  >
                    Download Clue
                  </a>
                </div>
              </div>
            ))}
          </Card>
        </section>
      </div>
    </>
  );
};

export default DashboardPage;
