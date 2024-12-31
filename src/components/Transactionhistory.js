import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showUser, searchUser } from "../features/userDetailSlice";

const Transactionhistory = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.app);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    dispatch(searchUser(e.target.value));
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error.message || "Something went wrong!"}</h2>;
  }

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">User List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search users by name..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">First Name</th>
              <th className="px-4 py-2 text-left">Last Name</th>
              <th className="px-4 py-2 text-left">Account Created</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{user.id}</td>
                <td className="px-4 py-2 border">{user.firstName || "N/A"}</td>
                <td className="px-4 py-2 border">{user.lastName || "N/A"}</td>
                <td className="px-4 py-2 border">{new Date(user.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2 border">
                  <Link to={`/edit/${user.id}`} className="text-blue-500 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactionhistory;
