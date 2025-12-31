import { useEffect } from "react";
import { useAsync } from "../../shared/hooks/useAsync";
import { getUser } from "../../shared/utils/service";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import type { RootState } from "../redux/store";
import { setUser } from "../redux/slices/userSlice";

const useAuth = () => {
  const { isLoggedIn } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const getUserAsync = useAsync(getUser);

  useEffect(() => {
    getUserAsync.execute();
  }, []);

  useEffect(() => {
    if (getUserAsync.value?.data?.username) {
      dispatch(setUser(getUserAsync.value.data));
    }
  }, [getUserAsync.value]);

  return {
    isLoggedIn,
    triggerGetUser: getUserAsync.execute,
  };
};

export default useAuth;
