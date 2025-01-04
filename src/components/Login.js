import { useEffect, useState } from "react";
import image from '../utils/30456.jpg';
import { bgurl } from "../utils/constant";
import { useSelector } from "react-redux";

const Login = () => {
  const [Message, setMessage] = useState("");
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ accountNumber: "", pinCode: "" });
  useEffect(() => {
    const storedAccountNumber = localStorage.getItem("accountnumber");
    const storedpinCode = localStorage.getItem("pinCode");
    if (storedAccountNumber && storedpinCode) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        accountNumber: storedAccountNumber,
        pinCode: storedpinCode,
      }));
    }
  }, []);

  const handleChange = (e) => {
    
    //console.log(`${e.target.name}: ${e.target.value}`);
    
    //console.log(`${e.target.name}: ${e.target.value}`);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    // Validate form fields
    if (!formData.accountNumber || !formData.pinCode) {
      setMessage("All fields are required.");
      return;
    }

    try {
      //console.log(`PIN Code: ${formData.pinCode.toString()}`);
      const payload = {
        accountNumber: parseInt(formData.accountNumber, 10), // Ensure conversion to an integer
        pinCode: formData.pinCode.toString(), // Ensure PIN is a string
      };

      //console.log("Payload:", payload);
      localStorage.setItem("Logincred:", JSON.stringify(payload));

      //console.log(localStorage.getItem("Logincred:"));

      // Dispatch login action with payload
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        accountNumber: 332359450,
        pinCode: "123456",
        accountNumber: 332359450,
        pinCode: "123456",
      });


      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: "follow",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://localhost:8080/login",
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          localStorage.setItem("accessToken", JSON.stringify(result));
          
          
        } else {
          const text = await response.text();
          throw new Error(`Unexpected response: ${text}`);
        }
      } catch (error) {
        console.error("Fetch error:", error); // Handle any errors
      }

      //localStorage.setItem("loginData", JSON.stringify(result));


      try {
        const response = await fetch(
          "http://localhost:8080/login",
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          localStorage.setItem("accessToken", JSON.stringify(result));
          
          
        } else {
          const text = await response.text();
          throw new Error(`Unexpected response: ${text}`);
        }
      } catch (error) {
        console.error("Fetch error:", error); // Handle any errors
      }

      //localStorage.setItem("loginData", JSON.stringify(result));

      setMessage("Login Successful");
      // window.location.href = "/dashboard";
      window.location.href = "/dashboard";
    } catch (error) {
      // Log the error and set a user-friendly message
      console.error("Error during login:", error);
      setMessage(error.message || "An err98765r occurred.");
      setMessage(error.message || "An err98765r occurred.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#1A1A1D",
          padding: "30px",
          paddingTop: "10px",
          marginTop: "100px",
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: "20px",color: "white"}}
          className="text-2xl font-bold"
        >
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="number"
              name="accountNumber"
              placeholder="Account Number"
              value={formData.accountNumber}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="password"
              name="pinCode"
              placeholder="Pin Code"
              value={formData.pinCode}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "#3B1C32",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {Message && (
          <p style={{ marginTop: "15px", textAlign: "center", color: "green" }}>
            {Message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
