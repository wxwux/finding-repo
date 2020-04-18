export const decodeToUnicode = (str) =>
  decodeURIComponent(
    atob(str)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );
