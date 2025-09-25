import React, { useState } from "react";

const useInput = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  const onValueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return [value, onValueChangeHandler] as const;
};

export default useInput;
