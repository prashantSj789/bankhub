import { useState } from "react";

const TransferMoney = () => {
  const [transferData, setTransferData] = useState({
    toAccount: "",
    amount: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setTransferData({ ...transferData, [e.target.name]: e.target.value });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();

    const accountNumber = localStorage.getItem("accountNumber");
    const pinCode = localStorage.getItem("pinCode");
    const token = localStorage.getItem("token");
    console.log(accountNumber,pinCode,token)

    if (!accountNumber || !pinCode || !token) {
      setMessage("Missing credentials. Please login again.");
      return;
    }

    try {
      // Create a refresh token
      const refreshResponse = await fetch("http://localhost:8080/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ accountNumber, pinCode }),
      });

      if (!refreshResponse.ok) {
        const errorData = await refreshResponse.json();
        throw new Error(errorData.message || "Failed to refresh token.");
      }

      const refreshData = await refreshResponse.json();
      const newToken = refreshData.token;
      localStorage.setItem("token", newToken); // Update token

      // Perform the transfer
      const transferPayload = {
        fromAccount: accountNumber,
        toAccount: transferData.toAccount,
        amount: parseFloat(transferData.amount),
      };

      const transferResponse = await fetch("http://localhost:8080/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
        },
        body: JSON.stringify(transferPayload),
      });

      if (transferResponse.ok) {
        const transferResult = await transferResponse.json();
        setMessage(
          `Transfer successful! Transaction ID: ${transferResult.transactionId}`
        );
      } else {
        const transferError = await transferResponse.json();
        throw new Error(transferError.message || "Transfer failed.");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleTransfer}>
      <input
        type="number"
        name="toAccount"
        placeholder="Recipient Account Number"
        value={transferData.toAccount}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={transferData.amount}
        onChange={handleChange}
        required
      />
      <button type="submit">Transfer Money</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default TransferMoney;
