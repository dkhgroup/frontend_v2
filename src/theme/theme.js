import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { shadows } from "./shadows";

import { Inter } from 'next/font/google';

export const inter = Inter({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#ED3237',
    },
    secondary: {
      main: '#422F2C',
    },
    error: {
      main: red.A400,
    },
    gray: {
      main: '#aaaaaa'
    },
    white: {
      main: '#ffffff'
    },
    midBlack: {
      main: '#333'
    }
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    body1: {
      fontSize: '15px'
    },
    body2: {
      fontSize: '14px'
    },
    h1: {
      fontSize: '30px',
      fontWeight: 700
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700
    },
    h3: {
      fontSize: '20px'
    }
  },
  shadows,
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: '#222'
        }
      },
    },
  },
});

export default theme;
