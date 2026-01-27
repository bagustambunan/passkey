import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '../../shared/utils/service';
import { useAsync } from '../../shared/hooks/useAsync';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import type { RootState } from '../redux/store';
import { setUser, logout as logoutAction } from '../redux/slices/userSlice';

export const useAuth = () => {
  const { isLoggedIn, user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const getUserAsync = useAsync(getUser);
  const logoutAsync = useAsync(logout);

  const fetchUser = async () => {
    const res = await getUserAsync.execute();
    if (res.data) {
      dispatch(setUser(res.data));
    }
  };

  const handleLogout = async () => {
    await logoutAsync.execute();
    dispatch(logoutAction());
    navigate('/login');
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { isLoggedIn, user, handleLogout };
};
