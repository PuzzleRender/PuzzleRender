import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "../components/Card";
import { useAuth } from "../components/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { Navigate } from "react-router-dom";

const DashboardPage = ({ generatePuzzle, fetchPuzzleHistory }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const [puzzleHistory, setPuzzleHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [puzzlesPerPage, setPuzzlesPerPage] = useState(3);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadPuzzleHistory(currentPage);
    }
  }, [isAuthenticated, currentPage]);

  const loadPuzzleHistory = async (page) => {
    setLoadingHistory(true);
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch(
        `https://learnopolia.tech/user-puzzles/?limit=${puzzlesPerPage}&page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load puzzle history");
      }

      const result = await response.json();

      setPuzzleHistory(result.puzzles);
      setTotalPages(result.total_pages);
      setCurrentPage(result.current_page);
    } catch (error) {
      toast.error("Failed to load puzzle history");
    } finally {
      setLoadingHistory(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGeneratePuzzle = async () => {
    setLoadingGenerate(true);
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch("https://learnopolia.tech/generate/15", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to generate puzzle");
      }

      loadPuzzleHistory(currentPage);
      toast.success("Puzzle generated successfully!");
    } catch (error) {
      toast.error("Failed to generate puzzle");
    } finally {
      setLoadingGenerate(false);
    }
  };

  const handleDownloadPuzzle = async (puzzleId) => {
    try {
      setLoadingDownload(puzzleId);
      const response = await fetch(
        `https://learnopolia.tech/download-puzzle/${puzzleId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to download puzzle: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `puzzle-${puzzleId}.pdf`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading puzzle:", error);
    } finally {
      setLoadingDownload(null);
    }
  };

  const handleDownloadClue = async (puzzleId) => {
    try {
      setLoadingDownload(puzzleId);
      const response = await fetch(
        `https://learnopolia.tech/download-clue/${puzzleId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to download clue: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `clue-${puzzleId}.pdf`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading clue:", error);
    } finally {
      setLoadingDownload(null);
    }
  };

  // Function to get a greeting based on the current time
  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 mt-6 ml-2">
          {getGreeting()}, {user.first_name}!
        </h1>

        <div className="my-12 text-center">
          <button
            onClick={handleGeneratePuzzle}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-lg mb-6"
          >
            {loadingGenerate ? (
              <ClipLoader size={24} color={"white"} />
            ) : (
              "Generate New Puzzle"
            )}
          </button>
        </div>

        <section className="bg-blue-50 px-4 py-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Puzzle History</h2>
            <button
              onClick={() => loadPuzzleHistory(currentPage)}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-3 rounded-lg text-sm mr-2"
            >
              {loadingHistory ? (
                <ClipLoader size={18} color={"white"} />
              ) : (
                "Refresh"
              )}
            </button>
          </div>

          <Card>
            {loadingHistory ? (
              <div className="flex justify-center items-center">
                <ClipLoader size={40} color={"blue"} />
              </div>
            ) : (
              <>
                {puzzleHistory.map((puzzle) => (
                  <div
                    key={puzzle.id}
                    className="border rounded-lg p-6 shadow-lg relative"
                  >
                    <h3 className="text-xl font-semibold mb-3">
                      Puzzle #{puzzle.id}
                    </h3>
                    <p className="mb-4">
                      Created: {new Date(puzzle.created_at).toLocaleString()}
                    </p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleDownloadPuzzle(puzzle.id)}
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-3 rounded-lg text-sm mr-2"
                        disabled={loadingDownload === puzzle.id}
                      >
                        {loadingDownload === puzzle.id ? (
                          <ClipLoader size={24} color={"white"} />
                        ) : (
                          "Download Puzzle"
                        )}
                      </button>
                      <button
                        onClick={() => handleDownloadClue(puzzle.id)}
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-3 rounded-lg text-sm mr-2"
                        disabled={loadingDownload === puzzle.id}
                      >
                        {loadingDownload === puzzle.id ? (
                          <ClipLoader size={24} color={"white"} />
                        ) : (
                          "Download Clue"
                        )}
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center my-6 mt-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-3 rounded-lg text-sm mr-2 ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-3 rounded-lg text-sm ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </Card>
          <button
            onClick={() => setCurrentPage(1)}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg text-sm mt-6"
          >
            Return to Page One
          </button>
        </section>
      </div>
    </>
  );
};

export default DashboardPage;
