import React from 'react';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <img src="/bitcoin.gif" alt="Loading..." className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40" />
    </div>
  );
};

export default Loader;
