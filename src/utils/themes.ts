import { createTheme } from "@mui/material/styles";

export const paperTheme = createTheme({
  components: {
    // Name of the component
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
        },

        rounded: {
          borderRadius: 8,
        },
      },
    },
  },
});
