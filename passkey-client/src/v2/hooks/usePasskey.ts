import { useEffect } from "react";
import { useAsync } from "../../shared/hooks/useAsync";
import {
  finishPasskeyRegistration,
  startPasskeyRegistration,
} from "../../shared/utils/service";
import type {
  Credential,
  StringifiedCredential,
} from "../../shared/constants/types";
import {
  arrayBufferToBase64Url,
  stringToArrayBuffer,
} from "../../shared/utils";

const usePasskey = () => {
  const isPasskeySupported = !!navigator.credentials.create;
  const startPasskeyRegistrationAsync = useAsync(startPasskeyRegistration);
  const finishPasskeyRegistrationAsync = useAsync(finishPasskeyRegistration);

  const handleRegisterPasskey = async () => {
    startPasskeyRegistrationAsync.execute();
  };

  const handleFinishPasskeyRegistration = async (
    options: PublicKeyCredentialCreationOptions
  ) => {
    const credential = (await navigator.credentials.create({
      publicKey: options,
    })) as Credential;

    if (credential) {
      const stringifiedCredential: StringifiedCredential = {
        id: credential.id,
        rawId: arrayBufferToBase64Url(credential.rawId),
        response: {
          clientDataJSON: arrayBufferToBase64Url(
            credential.response.clientDataJSON
          ),
          attestationObject: arrayBufferToBase64Url(
            credential.response.attestationObject
          ),
        },
        type: credential.type as PublicKeyCredentialType,
      };
      finishPasskeyRegistrationAsync.execute(stringifiedCredential);
    }
  };

  useEffect(() => {
    if (startPasskeyRegistrationAsync.value?.data) {
      const optionsFromServer = startPasskeyRegistrationAsync.value.data;
      const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions =
        {
          challenge: stringToArrayBuffer(optionsFromServer.challenge),
          rp: optionsFromServer.rp,
          user: {
            id: stringToArrayBuffer(optionsFromServer.user.id),
            name: optionsFromServer.user.name,
            displayName: optionsFromServer.user.displayName,
          },
          pubKeyCredParams: optionsFromServer.pubKeyCredParams,
          authenticatorSelection: optionsFromServer.authenticatorSelection,
          attestation:
            optionsFromServer.attestation as AttestationConveyancePreference,
          ...(optionsFromServer.excludeCredentials && {
            excludeCredentials: optionsFromServer.excludeCredentials.map(
              (cred) => ({
                id: stringToArrayBuffer(cred.id),
                type: cred.type as PublicKeyCredentialType,
                transports: cred.transports as AuthenticatorTransport[],
              })
            ),
          }),
        };
      handleFinishPasskeyRegistration(publicKeyCredentialCreationOptions);
    }
  }, [startPasskeyRegistrationAsync.value]);

  useEffect(() => {
    if (finishPasskeyRegistrationAsync.value?.data) {
      console.log("Passkey registered successfully");
    }
  }, [finishPasskeyRegistrationAsync.value]);

  return {
    isPasskeySupported,
    handleRegisterPasskey,
    handleFinishPasskeyRegistration,
  };
};

export default usePasskey;
