import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import { loginPasskeyFinish, loginPasskeyStart, registerPasskeyFinish, registerPasskeyStart } from '../../shared/utils/service';

export const usePasskey = () => {
  const registerPasskey = async () => {
    try {
      // 1. Get options from server
      const optionsRes = await registerPasskeyStart();
      const options = optionsRes.data;

      // 2. Pass options to browser
      const attResp = await startRegistration(options);

      // 3. Send response to server
      await registerPasskeyFinish(attResp);

      alert('Passkey registered successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to register passkey');
    }
  };

  const loginPasskey = async (username: string) => {
    try {
      // 1. Get options
      const optionsRes = await loginPasskeyStart(username);
      const options = optionsRes.data;

      // 2. Pass to browser
      const asseResp = await startAuthentication(options);

      // 3. Send response
      await loginPasskeyFinish(username, asseResp);

      // Success
      return true;
    } catch (error) {
      console.error(error);
      alert('Failed to login with passkey');
      return false;
    }
  };

  return { registerPasskey, loginPasskey };
};
