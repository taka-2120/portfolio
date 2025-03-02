export const age = (): number => {
  const birthday = new Date("2003-06-05");
  const today = new Date();
  const timeDiff = today.getTime() - birthday.getTime();
  return Math.floor(timeDiff / 1000 / 60 / 60 / 24 / 365);
};
