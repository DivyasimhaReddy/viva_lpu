// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import Todo from "./components/Todo";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Register />} />
//       <Route
//         path="/"
//         element={
//           <ProtectedRoute>
//             <Todo />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }

// export default App;

// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Todo from "./components/Todo";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Default route */}
      <Route
        path="/"
        element={<Navigate to={token ? "/todo" : "/register"} replace />}
      />

      {/* Auth routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected route */}
      <Route
        path="/todo"
        element={
          <ProtectedRoute>
            <Todo />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
