"use client";

import { ClipLoader } from "react-spinners";

const Loader = ({
  size = 45,
  color = "#2563eb",
  text = "Loading...",
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      
      <ClipLoader size={size} color={color} />

      <p className="text-slate-500 text-sm">
        {text}
      </p>

    </div>
  );
};

export default Loader;