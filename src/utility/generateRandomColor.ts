export const generateRandomColor = (): string => {
  let color: string;
  do {
    color = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
  } while (color === '#ffffff' || parseInt(color.substring(1), 16) > 0xfafafa); // Exclude very light colors
  return color;
};
