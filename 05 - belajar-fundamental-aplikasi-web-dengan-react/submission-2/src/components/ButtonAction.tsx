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
      className="border-none outline-none cursor-pointer bg-primary rounded-full p-3"
    >
      {children}
    </button>
  );
};

export default ButtonAction;
