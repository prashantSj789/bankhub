import React, { useEffect, useState } from "react";

import Cards from "./Cards";

import Logout from "./Logout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { accountNumber, pinCode, token } = useSelector((state) => state.auth);
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
  }, [accountNumber, token, pinCode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };
  if (!token) {
    window.location.href = "/login";
  }
  

  /*const handlelogin= async (e)=>{
    e.preventDefault();
    
    try {
      const logincred = localStorage.getItem("Logincred:");
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: logincred,
        redirect: "follow",
      };
  
      const response = await fetch("http://localhost:8080/login", requestOptions);
  
      if (response.ok) {
        const newdata = await response.json();
        localStorage.setItem("accessToken", newdata.token);
        console.log("New token generated:", newdata.token);
        return newdata.token; // Return the new token
      } else {
        console.error("Error generating token:", response.statusText);
        alert("Failed to generate token. Please log in again.");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error during token generation:", error);
      alert("An error occurred while generating the token. Please log in again.");
      window.location.href = "/login";
    }
  }*/
    const logincred = localStorage.getItem("Logincred:");
    console.log(logincred)
    const handlelogin = async () => {
    try {
      // Fetch new token when Learn More is clicked
      const logincred = localStorage.getItem("Logincred:");
      //console.log(logincred)
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: logincred,
      });

      if (!response.ok) {
        throw new Error("Failed to generate token.");
      }

      const data = await response.json();

      // Store token and expiry in localStorage
      // Token valid for 15 minutes
      localStorage.setItem("refreshtoken:", data.token);

      //console.log(localStorage.getItem("refreshtoken:"))

      alert("Token generated successfully! Proceed to transactions.");
    } catch (error) {
      //console.error("Error generating token:", error);
      alert("Failed to generate token. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row h-full">
        <aside className="flex flex-col items-center justify-between w-full md:w-20 py-5 bg-black">
          <div className="space-y-6">
            <div className="text-3xl text-yellow-500">🏦</div>
            <div className="flex flex-col pt-10 md:pt-20 space-y-5 text-gray-400">
              <button className="hover:text-yellow-500">🏠</button>
              <button className="hover:text-yellow-500">📊</button>
              <button className="hover:text-yellow-500">⚙️</button>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-yellow-500"
          >
            🔁
          </button>
        </aside>

        <div className="flex-1 p-6 space-y-6">
          <header className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex-1 w-full md:w-auto ">
              <input
                type="text"
                placeholder="Type to search digital art..."
                className="w-full md:max-w-lg p-3 text-gray-300 bg-gray-700 border-black rounded-lg focus:outline-none focus:ring focus:ring-yellow-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-gray-300">⚙️</div>
              <div className="flex items-center justify-center w-10 h-10 bg-gray-600 rounded-full">
                <span>👤</span>
              </div>
            </div>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Cards
              name="Trasaction History"
              url="https://lottie.host/embed/f61dd050-32f1-4359-ad9e-8bcd7e79cdc0/o4IvnItfp5.lottie"
              link="/transactionhistory"
              
            />
            <Cards
              name="Check Balance"
              url="https://lottie.host/embed/83180310-e822-46ae-92a9-19a4edd54d4c/4PLOoAkCjH.lottie"
              link="/checkbalance"
              

            />
            <div className="h-80">
              <div className="max-w-sm p-4">
                <div className="flex flex-col h-full p-8 bg-teal-400 rounded-lg dark:bg-black">
                  <div className="flex items-center mb-3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 text-white bg-indigo-500 rounded-full dark:bg-indigo-500">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg font-medium text-white dark:text-white">
                      Transfer Money
                    </h2>
                  </div>
                  <div className="flex flex-col justify-between flex-grow ">
                    <div className="rounded-lg">
                      <iframe src="https://lottie.host/embed/eef416f4-f861-4cbe-ab3f-45ef9b19dbe1/Fbzc5fKoUK.lottie"></iframe>
                    </div>
                    <Link to="/transfermoney">
                    <button
                      className="inline-flex items-center mt-3 text-black dark:text-white hover:text-blue-600"
                      onClick={handlelogin}
                    >
                      Learn More
                      
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                      </button>
                    </Link>
                    

                    
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="p-6 mt-6 bg-black rounded-lg shadow">
            <h3 className="mb-4 text-lg font-semibold text-white">
              All Transactions
            </h3>
            <div
              className="sm:max-h-[150px] md:max-h-[180px] lg:max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-neutral-500 dark:scrollbar-track-neutral-700"
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

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Dashboard;
