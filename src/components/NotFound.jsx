import React from 'react';

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#111111]">
      <img
        src="/404.png"
        alt="Page Not Found"
        className="max-w-full max-h-full object-contain md:max-w-3xl md:max-h-3xl"
      />
    </div>
  );
}

export default NotFound;
