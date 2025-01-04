import { useState } from "react";

const TransferMoney = () => {
  const [transferData, setTransferData] = useState({
    toAccount: "",
    amount: "",
  });
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setTransferData({ ...transferData, [e.target.name]: e.target.value });
  };
  //console.log(localStorage.getItem("refreshtoken:"))

  
  
  const handleTransfer = async (e) => {
    e.preventDefault();
    /*const logincred = localStorage.getItem("Logincred:");
    console.log(logincred);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: logincred,
      redirect: "follow",
    };

    const refresh = await fetch(
      "http://localhost:8080/login",
      requestOptions
    )
    if (!refresh.ok) {
      if (refresh.status === 401) {
        // If session expired, clear credentials and redirect
        alert("Session expired. Please log in again.");
        localStorage.removeItem("Logincred:");
        localStorage.removeItem("refreshtoken:");
        window.location.href = "/login";
      } else {
        // Handle other server errors
        const errorData = await refresh.json();
        console.error("Login error:", errorData.message || "Unknown error");
        alert(errorData.message || "Login failed. Please try again.");
      }
      return;
    }

    const newdata = await refresh.json();
    console.log(newdata.token);
    localStorage.setItem("refreshtoken:",newdata.token);*/

    
    
    try {
      const transferPayload = {
        "accountNumber": parseInt(transferData.toAccount),
        "pinCode": transferData.pinCode.toString(),
        "amount": parseInt(transferData.amount),
      };
      
      
      //console.log(localStorage.getItem("refreshtoken:"))
      
      
      // Perform the transfer request
      const myHeaders = new Headers();
      myHeaders.append(
        "Token",
        localStorage.getItem("refreshtoken:")
      );
      

      const raw = JSON.stringify(transferPayload);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response=await fetch("http://localhost:8080/transaction", requestOptions)
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Transaction failed.");
        setTransactionDetails(null);
        return;
      }

      const result = await response.json();
      setTransactionDetails({
        transactionId: result.transactionId,
        fromAccount: result.fromAccount,
        toAccount: result.toAccount,
        amount: result.amount,
        time: result.time,
      });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during the transaction.");
      setTransactionDetails(null);
      window.location.href = "/login";
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-600 to-gray-300 px-4 sm:px-6 lg:px-8">
    <form onSubmit={handleTransfer} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Transfer Money</h2>
    <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2" htmlFor="toAccount">
      Recipient Account Number
    </label>
      <input
        type="number"
        name="toAccount"
        placeholder="Recipient Account Number"
        value={transferData.toAccount}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required

      />
      </div>

    <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2" htmlFor="pinCode">
      Pin Code
    </label>
      <input
       type="password"
       name="pinCode"
       placeholder="Pin Code"
       value={transferData.pinCode}
       onChange={handleChange}
        required
      />
      </div>
    <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2" htmlFor="amount">
      Amount
    </label>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={transferData.amount}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">Transfer Money</button>
      {errorMessage && <p  className="text-red-500 text-sm mt-3 text-center">{errorMessage}</p>}

      {transactionDetails && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Transaction Details</h3>
          <ul className="mt-3 space-y-2">
            <li><strong>Transaction ID:</strong> {transactionDetails.transactionId}</li>
            <li><strong>From Account:</strong> {transactionDetails.fromAccount}</li>
            <li><strong>To Account:</strong> {transactionDetails.toAccount}</li>
            <li><strong>Amount:</strong> {transactionDetails.amount}</li>
            <li><strong>Time:</strong> {new Date(transactionDetails.time).toLocaleString()}</li>
          </ul>
        </div>
      )}
    </form>
    </div>
  );
};

export default TransferMoney;
