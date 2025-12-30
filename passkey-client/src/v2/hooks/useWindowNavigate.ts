import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { openWindow } from "../redux/slices/windowsSlice";

const useWindowNavigate = (windowKey: string) => {
  const { windows } = useAppSelector((state) => state.windows);
  const dispatch = useAppDispatch();

  const open = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(openWindow(windowKey));
  };

  return {
    isOpened: windows.some((window) => window.windowKey === windowKey),
    open,
  };
};

export default useWindowNavigate;
