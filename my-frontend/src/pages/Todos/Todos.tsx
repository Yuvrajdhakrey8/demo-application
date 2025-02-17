import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Todos.module.css";
import toast from "react-hot-toast";

interface Todo {
  _id: string;
  name: string;
  description: string;
  dueDate: string;
}

interface TodoFormValues {
  name: string;
  description: string;
  dueDate: string;
}

const todoSchema = yup.object({
  name: yup.string().required("Please enter a todo name"),
  description: yup.string().required("Please enter a description"),
  dueDate: yup.string().required("Please enter a due date"),
});

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormValues>({
    resolver: yupResolver(todoSchema),
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/todos");
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast.error("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onSubmit: SubmitHandler<TodoFormValues> = async (todo) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/add-todos",
        todo
      );
      const { msg, data, success } = response.data as any;
      if (success) {
        setTodos([...todos, data]);
        toast.success(msg || "Todo added succesfully");
        fetchTodos();
      }
      handleClose();
    } catch (error) {
      console.error("Error adding todo:", error);
      toast.success("Erro while adding todo");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/todo/${id}`);
      toast.success("Todo removed succesfully");

      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.success("error while removing todo");
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todos</h1>

      {/* Search Bar */}
      <TextField
        label="Search Todo"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          marginBottom: 2,
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            padding: "0px",
          },
        }}
      />

      {/* Add Button */}
      <Button
        variant="contained"
        onClick={handleOpen}
        disabled={loading}
        sx={{
          marginBottom: 2,
          backgroundColor: "#4CAF50",
          color: "white",
          borderRadius: "20px",
          padding: "8px 16px",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#45A049",
          },
        }}
      >
        {loading ? "Adding..." : "+ Add Todo"}
      </Button>

      {/* Todo List */}
      <div className={styles.listContainer}>
        {filteredTodos.map((todo) => (
          <Paper key={todo._id} elevation={3} className={styles.todoItem}>
            <div className={styles.todoContent}>
              <h3>{todo.name}</h3>
              <p>{todo.description}</p>
              <small>Due: {todo.dueDate}</small>
            </div>
            <Button
              variant="outlined"
              onClick={() => handleRemove(todo._id)}
              sx={{
                borderRadius: "12px",
                padding: "6px 12px",
                minWidth: "90px",
                color: "red",
                borderColor: "red",
                "&:hover": {
                  backgroundColor: "rgba(255,0,0,0.1)",
                },
              }}
            >
              Remove
            </Button>
          </Paper>
        ))}
      </div>

      {/* Add Todo Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Todo</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("name")}
              label="Todo Name"
              fullWidth
              margin="dense"
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  padding: "0px",
                },
              }}
            />
            <TextField
              {...register("description")}
              label="Description"
              fullWidth
              margin="dense"
              error={!!errors.description}
              helperText={errors.description?.message}
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  padding: "0px",
                },
              }}
            />
            <TextField
              {...register("dueDate")}
              label="Due Date"
              type="date"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              error={!!errors.dueDate}
              helperText={errors.dueDate?.message}
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  padding: "0px",
                },
              }}
            />
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: "#45A049",
                  },
                }}
              >
                {loading ? "Adding..." : "Add"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Todos;
