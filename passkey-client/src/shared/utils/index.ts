export function base64UrlToUint8Array(base64UrlString: string): Uint8Array {
  const base64 = base64UrlString
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  // Pad with '=' to make length a multiple of 4
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');

  const rawData = window.atob(padded);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

export function arrayBufferToBase64Url(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window
    .btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}
