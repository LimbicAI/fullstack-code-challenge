import { useState } from "react";

type UseModalReturnType = { isShowing: boolean; toggle: () => void };

export const useModal = (): UseModalReturnType => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const toggle = () => {
    setIsShowing((prevState) => !prevState);
  };

  return { isShowing, toggle };
};
