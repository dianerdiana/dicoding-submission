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
      className="border-none outline-none cursor-pointer"
    >
      {children}
    </button>
  );
};

export default ButtonAction;
