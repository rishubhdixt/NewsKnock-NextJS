import React from "react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <p className="text-sm">
          Developed by <span className="font-semibold">Rishubh Dixit</span>
        </p>
        <p className="text-sm mt-2">
          © {year}{" "}
          <span className="text-white">News</span>
          <span className="text-red-600">Knock</span> – All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;