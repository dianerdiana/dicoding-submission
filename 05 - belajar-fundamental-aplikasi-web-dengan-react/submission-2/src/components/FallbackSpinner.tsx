import { RotateCw } from "react-feather";

const FallbackSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center">
        <div className="animate-spin text-primary dark:text-blue-600">
          <RotateCw size={36} />
        </div>
      </div>
    </div>
  );
};

export default FallbackSpinner;
