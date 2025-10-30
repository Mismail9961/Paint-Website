import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[70vh] bg-white">
      <div className="relative flex flex-col items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-[#0A9396] border-[#94D2BD] shadow-md"></div>

        {/* Loading Text */}
        <p className="mt-5 text-[#0A9396] font-semibold text-sm sm:text-base tracking-wide">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
