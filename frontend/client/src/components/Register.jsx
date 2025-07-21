import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isRegister, setIsRegister] = useState(true); // toggle state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const endpoint = isRegister
        ? "http://localhost:3001/api/auth/register"
        : "http://localhost:3001/api/auth/login";

      const res = await axios.post(endpoint, { email, password });

      if (!isRegister) {
        // login success
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        navigate("/todo");
      } else {
        alert("Registration successful! You can now login.");
        setIsRegister(false); // switch to login
      }
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
        fontFamily: "Segoe UI, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#2c3e50",
            fontWeight: "bold",
          }}
        >
          {isRegister ? "📝 Register" : "🔐 Login"}
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
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
              marginBottom: "8px",
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
          onClick={handleSubmit}
          style={{
            width: "100%",
            backgroundColor: isRegister ? "#2ecc71" : "#0984e3",
            color: "#fff",
            padding: "12px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s",
          }}
        >
          {isRegister ? "Register" : "Login"}
        </button>

        <p
          style={{
            marginTop: "20px",
            fontSize: "14px",
            textAlign: "center",
            color: "#555",
          }}
        >
          {isRegister ? "Already registered?" : "New here?"}{" "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            style={{
              color: "#3498db",
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {isRegister ? "Login now" : "Register here"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
