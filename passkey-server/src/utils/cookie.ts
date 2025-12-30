export function getCookieValue(
  cookies: string,
  key: string
): string | undefined {
  const cookieArray = cookies.split('; ').map(c => c.trim());

  const filteredCookieArray = cookieArray?.filter(c => c.startsWith(`${key}=`));
  if (!filteredCookieArray?.length) {
    return undefined;
  }
  if (filteredCookieArray?.length > 1) {
    throw new Error(
      `Multiple ${key} cookies found. Please clear your cookies.`
    );
  }

  const cookie = filteredCookieArray?.[0];
  return cookie?.split('=')[1];
}
