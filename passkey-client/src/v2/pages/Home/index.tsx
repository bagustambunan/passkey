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
      <span>Hi, {user.name}</span>
      <Button onClick={registerPasskey}>Register Passkey</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
