import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const CreateTask = () => {
  const navigate = useNavigate();
  const userID = Cookies.get("userID");
  const authToken = Cookies.get("authToken");
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const name = document.querySelector('[name="name"]').value;
    const priorityLevel = document.querySelector('[name="priorityLevel"]').value;
    const dueDate = document.querySelector('[name="dueDate"]').value;

    if (!name || priorityLevel == "Task Priority Level" || !dueDate) {
      return alert("Please Fill Out All Fields");
    }

    try {
      await axios.post(
        apiUrl + "/dashboard/" + userID,
        { name, priorityLevel, dueDate },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      );
      navigate("/dashboard/" + userID);
    } catch ({
      response: {
        data: { code, data },
      },
    }) {
      navigate(`/action-fail`, { state: { code, data } });
    }
  };
  return (
    <form className="mx-auto flex w-2/3 flex-col place-items-center" onSubmit={onSubmitHandler}>
      <header className="mb-16 mt-16 text-5xl font-bold decoration-base-content">Create Task</header>
      <input type="text" name="name" placeholder="Name" className="input-bordered input-primary input h-12 w-full max-w-xs text-xl" />
      <br />
      <select name="priorityLevel" defaultValue="Task Priority Level" className="select-primary select w-full max-w-xs">
        <option disabled selected>
          Task Priority Level
        </option>
        <option value="1">High</option>
        <option value="2">Medium</option>
        <option value="3">Low</option>
      </select>
      <br />
      <input name="dueDate" className="btn-ghost btn-lg join-item btn w-1/2 min-w-max max-w-xs border border-primary" type="datetime-local" defaultValue={new Date().toISOString().slice(0, 16)} min={new Date().toISOString().slice(0, 16)}></input>
      <br />
      <div className="join">
        <button type="reset" className="btn-ghost join-item btn-lg btn w-1/2 border border-primary">
          Reset
        </button>
        <button type="submit" className="btn-ghost join-item btn-lg btn w-1/2 border border-primary">
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateTask;
