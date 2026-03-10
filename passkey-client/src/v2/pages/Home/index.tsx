import Button from '../../../shared/components/Button';
import { useAuth } from '../../hooks/useAuth';
import { usePasskey } from '../../hooks/usePasskey';

export default function HomePage() {
  const { user, handleLogout } = useAuth();
  const { registerPasskey } = usePasskey();

  if (!user) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <img src={"images/avatar.png"} alt="avatar" style={{ width: 100, height: 100 }} />
      <span>Hi, {user.name}</span>
      <Button onClick={registerPasskey}>Register Passkey</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
