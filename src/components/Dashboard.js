import React, { useEffect, useState } from "react";

import Cards from "./Cards";

import Logout from "./Logout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";


const Dashboard = () => {
  const dispatch = useDispatch();
  const {accountNumber,pinCode,token}=useSelector((state)=>state.auth);
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState([]);
 
  
  useEffect(() => {
    fetch(`http://localhost:8080/account`)
      .then((response) => response.json())
      .then((data) => setuserdata(data))
      .catch((error) => console.error("Error fetching data:", error));

      if (!accountNumber || !token) {
        const storedAccountNumber = localStorage.getItem("accountNumber");
        const storedToken = localStorage.getItem("token");
  
        if (!storedAccountNumber || !storedToken) {
          window.location = "/login";
        }
      }
      
    }, [accountNumber, token,pinCode]);
  
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    dispatch(logout());
    navigate("/login");
  };
  if(!token){
    window.location.href="/login"
  }

  return (
    <div className="bg-gray-900">
      <div className="flex h-screen bg-gray-900">
        <aside className="flex flex-col items-center justify-between w-20 py-5 bg-black">
          <div className="space-y-6">
            <div className="text-3xl text-yellow-500">🏦</div>
            <div className="flex flex-col pt-20 space-y-5 text-gray-400">
              <button className="hover:text-yellow-500">🏠</button>
              <button className="hover:text-yellow-500">📊</button>
              <button className="hover:text-yellow-500">⚙️</button>
            </div>
          </div>
          <button onClick={handleLogout} className="text-gray-400 hover:text-yellow-500">🔁</button>
        </aside>

        <div className="flex-1 p-6 space-y-6">
          <header className="flex items-center justify-between">
            <div className="flex-1 ">
              <input
                type="text"
                placeholder="Type to search digital art..."
                className="w-full max-w-lg p-3 text-gray-300 bg-gray-700 border-black rounded-lg focus:outline-none focus:ring focus:ring-yellow-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-gray-300">⚙️</div>
              <div className="flex items-center justify-center w-10 h-10 bg-gray-600 rounded-full">
                <span>👤</span>
              </div>
            </div>
          </header>

          <section className="grid grid-cols-3 gap-6 ">
            <Cards
              name="Transfer Money"
              url="https://lottie.host/embed/f61dd050-32f1-4359-ad9e-8bcd7e79cdc0/o4IvnItfp5.lottie"
              link="/transfermoney"
            />
            <Cards
              name="Check Balance"
              url="https://lottie.host/embed/83180310-e822-46ae-92a9-19a4edd54d4c/4PLOoAkCjH.lottie"
              link="/checkbalance"
            />
            <Cards
              name="Transaction History"
              url="https://lottie.host/embed/eef416f4-f861-4cbe-ab3f-45ef9b19dbe1/Fbzc5fKoUK.lottie"
              link="/transactionhistory"
            />
          </section>

          <section className="p-6 mt-6 bg-black rounded-lg shadow">
            <h3 className="mb-4 text-lg font-semibold text-white">
              All Transactions
            </h3>
            <div
              className="sm:max-h-[150px] lg:max-h-[200px] overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
            >
              <table className="w-full text-sm text-white border border-gray-900">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">First Name</th>
                    <th className="px-4 py-2 text-left">Last Name</th>

                    <th className="px-4 py-2 text-left">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.length > 0 ? (
                    userdata.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-900 even:bg-gray-900"
                      >
                        <td className="px-4 py-2">{user.id}</td>
                        <td className="px-4 py-2">{user.firstName || "N/A"}</td>
                        <td className="px-4 py-2">{user.lastName || "N/A"}</td>

                        <td className="px-4 py-2">
                          {new Date(user.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-2 text-center text-white"
                      >
                        No transactions available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
export default Dashboard;
