export function formatDate(date: Date) {
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

export function formatFullDate(date: Date) {
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
