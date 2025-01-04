import { useEffect, useState } from "react";
import { register } from "../services/authService";
import {bgurl} from  "../utils/constant";
import image from '../utils/30456.jpg'; // Adjust the path based on the file location

import { useNavigate } from 'react-router-dom';



const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    pinCode: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      pinCode: "",
      email: "",
    }));
  }, []);

  

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response=await register(formData);
      const accountnumber=response.accountNumber
      console.log(accountnumber)
      setMessage("Registration successful! Please login.");
      localStorage.setItem("accountnumber",response.accountNumber)
      
      setTimeout(() => {
        navigate('/login'); 
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage("Error: " + error.response.data.message);
      } else {
        setMessage("Error: Unable to connect to the server.");
      }
    }
  };
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      pinCode: "",
      email:"",
    }));
  }, []);
  
  return (
    
    <div style={{
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      
      <div style={{
      padding: "30px",
      paddingTop:"10px",
      marginTop:"100px",
      borderRadius: "15px",
      backgroundColor: "#1A1A1D",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      width: "100%",
      maxWidth: "400px",
    }} className="bg-gray-900">
      <h2 style={{ textAlign: "center", marginBottom: "20px",color: "white" }} className="text-2xl font-bold">Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
        <input className="bg-white "
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
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
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
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
        <div style={{ marginBottom: "15px" }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        /></div>
        <button type="submit"
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          backgroundColor: "#3B1C32",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }} >Register</button>
      </form>
      {message && <p style={{ marginTop: "15px", textAlign: "center", color: "green" }}>{message}</p>}
      </div>
      
    </div>
  );
};

export default Register;
