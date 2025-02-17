import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Todos } from "./pages";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
