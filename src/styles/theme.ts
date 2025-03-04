import { createTheme } from '@mui/material/styles';

const primaryMain = '#1976d2';
const secondaryMain = '#ff4081';
const backgroundDefault = '#f5f5f5';

const theme = createTheme({
  palette: {
    primary: {
      main: primaryMain,
    },
    secondary: {
      main: secondaryMain,
    },
    background: {
      default: backgroundDefault,
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          textTransform: 'uppercase',
        },
      },
    },
  },
});

export default theme;
