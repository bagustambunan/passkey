import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import { post } from '../../shared/utils/fetch';

export const usePasskey = () => {
  const registerPasskey = async () => {
    try {
      // 1. Get options from server
      const optionsRes = await post<any, { data: any; message: string }>({
        url: '/passkey/register-start',
      });
      const options = optionsRes.data;

      // 2. Pass options to browser
      const attResp = await startRegistration(options);

      // 3. Send response to server
      await post({ url: '/passkey/register-finish', data: attResp });

      alert('Passkey registered successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to register passkey');
    }
  };

  const loginPasskey = async (username: string) => {
    try {
      // 1. Get options
      const optionsRes = await post<any, { data: any; message: string }>({
        url: '/passkey/login-start',
        data: { username },
      });
      const options = optionsRes.data;

      // 2. Pass to browser
      const asseResp = await startAuthentication(options);

      // 3. Send response
      await post({
        url: '/passkey/login-finish',
        data: { username, ...asseResp },
      });

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
