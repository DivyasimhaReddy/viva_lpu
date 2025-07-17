import express from "express";
import Todo from "../models/Todo.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all todos
router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Add a todo
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = new Todo({ title, userId: req.userId });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update a todo
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true } // return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete a todo
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
