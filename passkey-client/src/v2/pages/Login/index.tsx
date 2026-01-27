import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';
import Tabs from '../../../shared/components/Tabs';
import { useState } from 'react';
import { post } from '../../../shared/utils/fetch';
import { useNavigate } from 'react-router-dom';
import { usePasskey } from '../../hooks/usePasskey';

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginPasskey } = usePasskey();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pkUsername, setPkUsername] = useState('');

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await post({ url: '/auth/login', data: { username, password } });
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  const handlePasskeyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkUsername) {
      alert('Username is required');
      return;
    }
    const success = await loginPasskey(pkUsername);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="container">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: 300,
        }}
      >
        <Tabs
          key="login"
          tabItems={[
            {
              key: 'with-password',
              label: 'With Password',
              content: (
                <form
                  onSubmit={handlePasswordLogin}
                  style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                >
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <Button type="submit">Login</Button>
                </form>
              ),
            },
            {
              key: 'with-passkey',
              label: 'With Passkey',
              content: (
                <form
                  onSubmit={handlePasskeyLogin}
                  style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                >
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={pkUsername}
                    onChange={e => setPkUsername(e.target.value)}
                  />
                  <Button type="submit">Login with Passkey</Button>
                </form>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
