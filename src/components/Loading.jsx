import React from "react";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
const Loading = () => {
  return (
    <>
      <br />
      <br />
      <br />
      <div className="flex h-96 w-full flex-row justify-between">
        <ArrowsPointingOutIcon className="w-28 animate-bounce justify-self-start text-primary text-opacity-10" />
        <ArrowsPointingOutIcon className="w-32 animate-bounce justify-self-start text-primary text-opacity-40" />
        <ArrowsPointingOutIcon className="w-36 animate-bounce justify-self-start text-primary text-opacity-70" />
        <ArrowsPointingOutIcon className="w-40 animate-bounce justify-self-start text-primary text-opacity-100" />
        <h1 className="animate-pulse pt-20 text-9xl font-extrabold opacity-40">Loading</h1>
        <ArrowsPointingOutIcon className="w-40 animate-bounce justify-self-end text-primary text-opacity-100" />
        <ArrowsPointingOutIcon className="w-36 animate-bounce justify-self-end text-primary text-opacity-70" />
        <ArrowsPointingOutIcon className="w-32 animate-bounce justify-self-end text-primary text-opacity-40" />
        <ArrowsPointingOutIcon className="w-28 animate-bounce justify-self-end text-primary text-opacity-10" />
      </div>
    </>
  );
};

export default Loading;
