import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/todo");
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "28px",
            color: "#2c3e50",
            fontSize: "28px",
            fontWeight: "700",
          }}
        >
          🔐 Login
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              color: "#34495e",
            }}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "15px",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "25px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              color: "#34495e",
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "15px",
              outline: "none",
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            backgroundColor: "#3498db",
            color: "#fff",
            padding: "12px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "0.3s",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Auth;
