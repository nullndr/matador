export const toFirstLetterUpperCase = (value: string) => {
  return value.charAt(0).toLocaleUpperCase() + value.slice(1);
};
