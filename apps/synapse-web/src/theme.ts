import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "sami-green",
  colors: {
    "sami-green": [
      "#e8f5e9",
      "#c8e6c9",
      "#a5d6a7",
      "#81c784",
      "#66bb6a",
      "#4caf50",
      "#43a047",
      "#388e3c",
      "#2e7d32",
      "#1b5e20",
    ],
  },
  fontFamily: "Inter, system-ui, sans-serif",
  components: {
    AppShell: {
      defaultProps: {
        navbar: { width: 260, breakpoint: "md" },
        header: { height: 60 },
      },
    },
  },
});
