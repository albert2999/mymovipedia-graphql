import React from "react";

const DescSkeleton = () => {
  return (
    <div>
      <div className="animate-pulse bg-slate-400 h-7 w-36 rounded-md my-3"> 
      </div>
      <div className="animate-pulse bg-slate-400 h-5 w-20 rounded-md my-3"> 
      </div>
      <div className="animate-pulse flex items-center justify-center bg-slate-400 h-96 w-full lg:w-96 rounded-md my-3">
        <p className="animate-bounce ">Loading...</p>
      </div>
    </div>
  );
};

export default DescSkeleton;
