import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../components/AuthContext";
import { Navigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader from react-spinners

const AccountPage = () => {
  const { isAuthenticated, user, token, setAndUpdateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password1: "",
    new_password2: "",
  });
  const [isSaving, setIsSaving] = useState(false); // State for Save button loading
  const [isChangingPassword, setIsChangingPassword] = useState(false); // State for Change Password button loading

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user, isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true); // Set loading state to true
    try {
      const response = await fetch(
        "https://learnopolia.tech/api/update-user/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setIsEditing(false);
        toast.success(data.message);
        setAndUpdateUser(data.user);
      } else {
        Object.entries(data.errors).forEach(([field, errors]) => {
          toast.error(`${field}: ${errors.join(", ")}`);
        });
      }
    } catch (error) {
      toast.error("Failed to update account. Please try again.");
    } finally {
      setIsSaving(false); // Set loading state to false
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.new_password1 !== passwordData.new_password2) {
      toast.error("New passwords do not match");
      return;
    }
    setIsChangingPassword(true); // Set loading state to true
    try {
      const response = await fetch(
        "https://learnopolia.tech/api/change-password/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(passwordData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setPasswordData({
          old_password: "",
          new_password1: "",
          new_password2: "",
        });
      } else {
        Object.entries(data.errors).forEach(([field, errors]) => {
          toast.error(`${field}: ${errors.join(", ")}`);
        });
      }
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    } finally {
      setIsChangingPassword(false); // Set loading state to false
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h2 className="text-3xl text-center font-semibold mb-6">
            Account Details
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              className="border rounded w-full py-2 px-3 mb-2"
              value={userData.first_name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              className="border rounded w-full py-2 px-3 mb-2"
              value={userData.last_name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="border rounded w-full py-2 px-3 mb-2"
              value={userData.username}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="border rounded w-full py-2 px-3 mb-2"
              value={userData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="flex justify-end space-x-4">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline relative"
                disabled={isSaving} // Disable button when loading
              >
                {isSaving ? <ClipLoader size={24} color={"white"} /> : "Save"}
              </button>
            )}
          </div>
        </div>

        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 mt-8">
          <h3 className="text-2xl text-center font-semibold mb-6">
            Change Password
          </h3>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Current Password
              </label>
              <input
                type="password"
                name="old_password"
                className="border rounded w-full py-2 px-3 mb-2"
                value={passwordData.old_password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                New Password
              </label>
              <input
                type="password"
                name="new_password1"
                className="border rounded w-full py-2 px-3 mb-2"
                value={passwordData.new_password1}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                name="new_password2"
                className="border rounded w-full py-2 px-3 mb-2"
                value={passwordData.new_password2}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline relative"
                disabled={isChangingPassword} // Disable button when loading
              >
                {isChangingPassword ? (
                  <ClipLoader size={24} color={"white"} />
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
