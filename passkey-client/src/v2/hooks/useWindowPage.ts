import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { openWindow } from "../redux/slices/windowsSlice";

const useWindowPage = (windowKey: string, route: string) => {
  const isThisPage = useLocation().pathname === route;
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const { windows } = useAppSelector((state) => state.windows);
  useEffect(() => {
    setIsOpened(windows.some((window) => window.windowKey === windowKey));
  }, [windows, windowKey]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isThisPage) {
      dispatch(openWindow(windowKey));
    }
  }, [isThisPage, dispatch, windowKey]);

  return {
    isOpened,
    isThisPage,
  };
};

export default useWindowPage;