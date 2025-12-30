import { useAsync } from "../../shared/hooks/useAsync";
import { login } from "../../shared/utils/service";

const useAuth = () => {
  const loginAsync = useAsync(login);

  const handleLogin =  async(username: string, password: string) => {
    loginAsync.execute(username, password);
  };

  return {
    handleLogin,
    isLoading: loginAsync.isPending,
  }
};

export default useAuth;
