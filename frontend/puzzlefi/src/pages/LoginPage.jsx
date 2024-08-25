import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../components/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const loginSubmit = async (loginData) => {
    try {
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:8000/signin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        credentials: "include", // This sends cookies with the request if needed
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const { access, user } = await response.json(); // Assuming the JWT is returned in the 'token' field

      login(user, access);
      toast.success("Logged in successfully!");
      navigate("/dashboard"); // Navigate to the homepage or any other route
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false); // Hide spinner regardless of success or error
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password,
    };

    await loginSubmit(loginData); // This will call the loginSubmit function and handle navigation on success
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter your username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="relative">
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline disabled:opacity-50"
                type="submit"
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? ( // Conditionally render spinner or text
                  <div className="flex items-center justify-center">
                    <div className="spinner mr-2"></div>
                    Loading...
                  </div>
                ) : (
                  "Log in"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
