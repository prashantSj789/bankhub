import { useEffect, useState } from "react";
import { login } from "../features/userDetailSlice";
import { bgurl } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
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
    console.log(`${e.target.name}: ${e.target.value}`); 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.accountNumber || !formData.pinCode) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const payload = {
        accountNumber: parseInt(formData.accountNumber, 10),
        pinCode: formData.pinCode ? formData.pinCode.toString() : "",
      };
      console.log(payload);
      dispatch(login(payload));

      setMessage("Login Successful");
    } catch (error) {
      setMessage(error.message || "An error occurred.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgurl})`,
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
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "30px",
          paddingTop: "10px",
          marginTop: "200px",
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: "20px" }}
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
              backgroundColor: "#007BFF",
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
