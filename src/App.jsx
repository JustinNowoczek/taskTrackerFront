import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Dashboard from "./components/Dashboard";
import ActionFail from "./components/ActionFail";
import TaskLists from "./components/TaskLists";
import PageNotFoundRedirect from "./components/PageNotFoundRedirect";
import CreateTask from "./components/CreateTask";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard/:userID" element={<Dashboard />} />
        <Route path="/dashboard/:userID/:isCompleted/:sortDateNotPriority" element={<TaskLists />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard/:userID/create" element={<CreateTask />} />

        <Route path="/action-fail" element={<ActionFail />} />
        <Route path="*" element={<PageNotFoundRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
