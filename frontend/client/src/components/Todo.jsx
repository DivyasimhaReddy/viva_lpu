import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Todo() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(res.data);
    } catch (error) {
      console.error(
        "❌ Failed to fetch todos:",
        error.response?.data || error.message
      );
    }
  };

  const addOrUpdateTask = async () => {
    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:3001/api/todo/${editingId}`,
          { title },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEditingId(null);
      } else {
        await axios.post(
          "http://localhost:3001/api/todo",
          { title },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      setTitle("");
      fetchTodos();
    } catch (error) {
      console.error(
        "❌ Failed to add/update task:",
        error.response?.data || error.message
      );
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTodos();
    } catch (error) {
      console.error(
        "❌ Failed to delete task:",
        error.response?.data || error.message
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        maxWidth: "600px",
        margin: "40px auto",
        background: "linear-gradient(135deg, #e0f7fa, #f9f9f9)",
        minHeight: "90vh",
        fontFamily: "Segoe UI, sans-serif",
        borderRadius: "16px",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
      }}
    >
      <h2
        style={{
          color: "#2c3e50",
          textAlign: "center",
          marginBottom: "30px",
          fontWeight: "bold",
          fontSize: "28px",
        }}
      >
        📝 My Todo List
      </h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
        <input
          placeholder="Enter a task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "16px",
            outline: "none",
            backgroundColor: "#fefefe",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
          }}
        />
        <button
          onClick={addOrUpdateTask}
          style={{
            backgroundColor: editingId ? "#f39c12" : "#27ae60",
            color: "#fff",
            border: "none",
            padding: "12px 18px",
            borderRadius: "8px",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {editingId ? "Update" : "Add"}
        </button>
        <button
          onClick={logout}
          style={{
            backgroundColor: "#c0392b",
            color: "#fff",
            border: "none",
            padding: "12px 18px",
            borderRadius: "8px",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((t) => (
          <li
            key={t._id}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #ddd",
              padding: "14px 20px",
              borderRadius: "10px",
              marginBottom: "14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                color: "#34495e",
                wordBreak: "break-word",
                flex: 1,
              }}
            >
              {t.title}
            </span>
            <div style={{ display: "flex", gap: "10px", marginLeft: "10px" }}>
              <button
                onClick={() => {
                  setTitle(t.title);
                  setEditingId(t._id);
                }}
                style={{
                  backgroundColor: "#2980b9",
                  color: "#fff",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "13px",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(t._id)}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "13px",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
