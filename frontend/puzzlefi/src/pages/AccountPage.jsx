import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AccountPage = ({ user, updateUser, changePassword }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateUser(userData);
      setIsEditing(false);
      toast.success("Account updated successfully!");
    } catch (error) {
      toast.error("Failed to update account. Please try again.");
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      await changePassword(passwordData);
      toast.success("Password changed successfully!");
      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
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
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              >
                Save
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
                name="current_password"
                className="border rounded w-full py-2 px-3 mb-2"
                value={passwordData.current_password}
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
                name="new_password"
                className="border rounded w-full py-2 px-3 mb-2"
                value={passwordData.new_password}
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
                name="confirm_password"
                className="border rounded w-full py-2 px-3 mb-2"
                value={passwordData.confirm_password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
