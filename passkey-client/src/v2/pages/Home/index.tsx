import type { RootState } from "../../redux/store";
import Button from "../../../shared/components/Button";
import { logout } from "../../../shared/utils/service";
import { useAsync } from "../../../shared/hooks/useAsync";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout as logoutAction } from "../../redux/slices/userSlice";
import usePasskey from "../../hooks/usePasskey";

export default function HomePage() {
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const logoutAsync = useAsync(logout);

  const handleLogout = async () => {
    logoutAsync.execute();
    dispatch(logoutAction());
  };

  const { isPasskeySupported, handleRegisterPasskey } = usePasskey();

  return (
    <div className="container">
      <span>Hi, {user?.username}</span>
      {isPasskeySupported && (
        <Button onClick={handleRegisterPasskey}>Register Passkey</Button>
      )}
      <Button onClick={handleLogout} loading={logoutAsync.isPending}>
        Logout
      </Button>
    </div>
  );
}
