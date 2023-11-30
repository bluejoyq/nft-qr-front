import { useTheme } from "@mui/joy";

export const usePalette = () => {
  const theme = useTheme();
  const palette = theme.palette;
  return palette;
};
