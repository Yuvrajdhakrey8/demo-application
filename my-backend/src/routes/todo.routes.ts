import { Router } from "express";
import { addTodo, deleteTodo, getTodos } from "../controller/todo.controller";

const router = Router();

router.post("/add-todos", addTodo);
router.delete("/todo/:id", deleteTodo);
router.get("/todos", getTodos);

export default module.exports = router;
