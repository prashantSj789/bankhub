import React, { useEffect, useState } from "react";

const Checkbalance = () => {
  const [formData, setFormData] = useState({});
  const [balanceData, setBalanceData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedpinCode = localStorage.getItem("pinCode");
    if (storedpinCode) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        pinCode: storedpinCode,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  //console.log(localStorage.getItem("accessToken"));
  const handleSubmit = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    const accessToken1 = localStorage.getItem("accessToken");
    const accessToken = JSON.parse(accessToken1);
    //console.log("Token at Submit:", accessToken);
    const pinCode = formData.pinCode;

    // Log token and pinCode for debugging
    //console.log("Access Token:", accessToken.accountNumber);
    //console.log("Pin Code:", pinCode);

    if (!accessToken || !pinCode) {
      console.error("Access Token or Pin Code is missing");
      return;
    }

    // Append headers
    myHeaders.append("Token", accessToken.token);
    myHeaders.append("PinCode", pinCode);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8080/balance",
        requestOptions
      );
      const result = await response.json();
      setBalanceData(result);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message || "Error sending data to server:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-300">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
      <h2 className="mb-6 text-xl font-semibold text-center text-gray-700">
          Check Your Balance
        </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="password"
        name="pinCode"
        placeholder="Pin Code"
        value={formData?.pinCode || ""}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">Submit</button>
      </form>
      {errorMessage && (
        <p className="mt-4 text-center text-red-500">{errorMessage}</p>
      )}

      {balanceData && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900">Balance Details:</h3>
          <h2 className="p-4 mt-2 text-sm text-gray-700 bg-gray-100 rounded-md">{JSON.stringify(balanceData, null, 2)}
          </h2>
        </div>
      )}
    </div>
    </div>
  );
};

export default Checkbalance;
