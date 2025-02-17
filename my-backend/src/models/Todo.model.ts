import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  name: string;
  description: string;
  dueDate: Date;
}

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
});

export const Todo = mongoose.model<ITodo>("Todo", todoSchema);
