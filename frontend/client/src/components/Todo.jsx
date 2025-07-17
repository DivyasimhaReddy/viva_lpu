// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Todo() {
//   const [title, setTitle] = useState("");
//   const [todos, setTodos] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const navigate = useNavigate();

//   // Get token from localStorage
//   const token = localStorage.getItem("token");

//   // Redirect to login if no token
//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     fetchTodos();
//   }, []);

//   // Fetch todos
//   const fetchTodos = async () => {
//     try {
//       const res = await axios.get("http://localhost:3001/api/todo", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setTodos(res.data);
//     } catch (error) {
//       console.error(
//         "❌ Failed to fetch todos:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   // Add or Update task
//   const addOrUpdateTask = async () => {
//     if (!title.trim()) {
//       alert("Please enter a task title.");
//       return;
//     }

//     try {
//       if (editingId) {
//         await axios.put(
//           `http://localhost:3001/api/todo/${editingId}`,
//           { title },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setEditingId(null);
//       } else {
//         await axios.post(
//           "http://localhost:3001/api/todo",
//           { title },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//       }

//       setTitle("");
//       fetchTodos();
//     } catch (error) {
//       console.error(
//         "❌ Failed to add/update task:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   // Delete a task
//   const deleteTask = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3001/api/todo/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       fetchTodos();
//     } catch (error) {
//       console.error(
//         "❌ Failed to delete task:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   // Logout
//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Todo List</h2>
//       <input
//         placeholder="Enter Task"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <button onClick={addOrUpdateTask} style={{ marginLeft: "10px" }}>
//         {editingId ? "Update" : "Add"}
//       </button>
//       <button onClick={logout} style={{ marginLeft: "10px" }}>
//         Logout
//       </button>

//       <ul style={{ marginTop: "20px" }}>
//         {todos.map((t) => (
//           <li key={t._id} style={{ marginBottom: "10px" }}>
//             {t.title}
//             <button
//               onClick={() => {
//                 setTitle(t.title);
//                 setEditingId(t._id);
//               }}
//               style={{ marginLeft: "10px" }}
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => deleteTask(t._id)}
//               style={{ marginLeft: "10px" }}
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Todo;

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
        padding: "30px",
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>📝 Todo List</h2>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          placeholder="Enter Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "250px",
          }}
        />
        <button
          onClick={addOrUpdateTask}
          style={{
            padding: "8px 14px",
            backgroundColor: editingId ? "#f39c12" : "#27ae60",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {editingId ? "Update" : "Add"}
        </button>
        <button
          onClick={logout}
          style={{
            padding: "8px 14px",
            backgroundColor: "#c0392b",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <ul style={{ marginTop: "30px", listStyle: "none", padding: 0 }}>
        {todos.map((t) => (
          <li
            key={t._id}
            style={{
              backgroundColor: "#fff",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "6px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "16px", color: "#2c3e50" }}>
              {t.title}
            </span>
            <div>
              <button
                onClick={() => {
                  setTitle(t.title);
                  setEditingId(t._id);
                }}
                style={{
                  padding: "6px 10px",
                  marginRight: "8px",
                  backgroundColor: "#2980b9",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(t._id)}
                style={{
                  padding: "6px 10px",
                  backgroundColor: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
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
