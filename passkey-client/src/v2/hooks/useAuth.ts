import { useState, useEffect } from 'react';
import { get } from '../../shared/utils/fetch';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState<{ name: string; username: string } | null>(
    null
  );
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await get<any, { data: any }>({ url: '/auth/user' });
      setUser(res.data);
    } catch (error) {
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await get({ url: '/auth/logout' });
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, logout };
};
