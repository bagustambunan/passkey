export function formatResponse(
  message: string,
  data: any | null
): { message: string; data: any | null } {
  return {
    message,
    data,
  };
}
