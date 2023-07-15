import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const name = document.querySelector('[name="name"]').value;
    const password = document.querySelector('[name="password"]').value;

    if (!name || !password) {
      return alert("Please Provide All Details");
    }
    console.log(apiUrl + "/login");
    try {
      const {
        data: {
          data: { authToken, userID },
        },
      } = await axios.post(
        apiUrl + "/login",
        { name, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Cookies.set("authToken", authToken, { expires: 1 / 48 });
      Cookies.set("userID", userID, { expires: 1 / 48 });

      navigate("/dashboard/" + userID);
    } catch (er) {
      console.log(er);
      //navigate(`/action-fail`, { state: { code, data } });
    }
  };

  return (
    <form className="flex h-96 flex-col place-items-center" onSubmit={onSubmitHandler}>
      <header className="mb-16 mt-16 grow text-5xl font-bold decoration-base-content">Login Into Your Account</header>
      <input type="text" name="name" placeholder="Name" className="input-bordered input-primary input w-full max-w-xs grow text-xl" />
      <br />
      <input type="password" name="password" placeholder="Password" className="input-bordered input-primary input w-full max-w-xs grow text-xl" />
      <br />
      <div className="join">
        <button type="reset" className="btn-ghost btn-lg join-item btn w-1/2 border border-primary">
          Reset
        </button>
        <button type="submit" className="btn-ghost btn-lg join-item btn w-1/2 border border-primary">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
