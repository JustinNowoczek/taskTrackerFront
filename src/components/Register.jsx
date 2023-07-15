import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const name = document.querySelector('[name="name"]').value;
    const password = document.querySelector('[name="password"]').value;

    if (!name || !password) {
      return alert("Please Provide All Details");
    }

    try {
      await axios.post(
        apiUrl + "/register",
        { name, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate(`/login`);
    } catch ({
      response: {
        data: { code, data },
      },
    }) {
      navigate(`/action-fail`, { state: { code, data } });
    }
  };

  return (
    <form className="flex h-96 flex-col place-items-center" onSubmit={onSubmitHandler}>
      <header className="mb-16 mt-16 grow text-5xl font-bold decoration-base-content">Register Your Account</header>
      <input type="text" name="name" placeholder="Name" className="input-bordered input-primary input w-full max-w-xs grow text-xl" />
      <br />
      <input type="password" name="password" placeholder="Password" className="input-bordered input-primary input w-full max-w-xs grow text-xl" />
      <br />
      <div className="join">
        <button type="reset" className="btn-ghost btn-lg join-item btn w-1/2 border-primary">
          Reset
        </button>
        <button type="submit" className="btn-ghost btn-lg join-item btn w-1/2 border-primary">
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
