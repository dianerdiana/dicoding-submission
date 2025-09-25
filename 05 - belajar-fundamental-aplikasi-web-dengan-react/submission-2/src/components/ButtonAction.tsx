import type { MouseEventHandler } from "react";

const ButtonAction = ({
  title,
  children,
  onClick,
}: {
  title: string;
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className="p-3 rounded-full outline-none cursor-pointer bg-primary dark:bg-gray-900"
    >
      {children}
    </button>
  );
};

export default ButtonAction;
