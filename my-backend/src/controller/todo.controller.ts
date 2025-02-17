import { Request, Response } from "express";
import { Todo } from "../models";

// Add a new Todo
export const addTodo = async (req: Request, res: Response) => {
  try {
    const { name, description, dueDate } = req.body;
    const newTodo = new Todo({ name, description, dueDate });
    await newTodo.save();
    res
      .status(201)
      .json({ success: true, msg: "Todo added successfully", data: newTodo });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Error adding todo", error });
  }
};

// Delete a Todo
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ success: true, msg: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Error deleting todo", error });
  }
};

// Get All Todos
export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: "Error fetching todos", error });
  }
};
