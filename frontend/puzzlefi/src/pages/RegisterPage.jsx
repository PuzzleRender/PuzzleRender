import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerSubmit = async (newUser) => {
    try {
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:8000/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
        credentials: "include", // Ensures cookies are included, important for session-based authentication
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMessages = Object.values(data.errors || {})
          .flat()
          .join(" "); // Combine all error messages into a single string

        throw new Error(errorMessages || "Registration failed");
      }

      toast.success("User registered successfully!");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false); // Hide spinner regardless of success or error
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      toast.error("Passwords do not match");
      return;
    }

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password1,
      password2,
    };

    await registerSubmit(newUser);
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Register
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter your first name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter your last name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Choose a username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password1"
                name="password1"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter your password"
                required
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="password2"
                name="password2"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Confirm your password"
                required
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
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
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
