import React from "react";

const Button = ({
  className,
  text,
  onClick,
}: {
  className?: string;
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      data-modal-hide="default-modal"
      type="button"
      className={`${className} py-2.5 px-5 text-sm font-medium  focus:outline-none rounded-lg border focus:z-10 focus:ring-4  focus:ring-gray-700 bg-gray-800  border-gray-600 hover:text-white hover:bg-gray-700"`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
