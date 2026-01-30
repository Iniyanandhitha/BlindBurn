import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

// Premium Dark Theme Palette
const primaryColor = '#4CAF50'; // Vibrant Green
const secondaryColor = '#81C784'; // Lighter Green
const backgroundColor = '#121212'; // True Dark
const paperColor = '#1E1E1E'; // Dark Card
const textColor = '#E0E0E0'; // Off-white text

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    background: {
      default: backgroundColor,
      paper: paperColor,
    },
    text: {
      primary: textColor,
      secondary: grey[500],
    },
  },
  typography: {
    fontFamily: '"Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
      letterSpacing: '0.5px',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '0.3px',
    },
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#333 #121212',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#121212',
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#333',
            minHeight: 24,
            border: '2px solid #121212',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove default elevation overlay
          backgroundColor: paperColor,
          borderRadius: 16,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          marginBottom: '8px',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'translateY(-2px)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            border: `1px solid ${primaryColor}`,
            '&:hover': {
              backgroundColor: 'rgba(76, 175, 80, 0.3)',
            },
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: '8px 0',
          borderRadius: '12px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '8px 0',
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            transition: 'background-color 0.2s',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '10px 24px',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(76, 175, 80, 0.4)',
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: {
          background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-active': {
            color: primaryColor,
          },
          '&.Mui-completed': {
            color: primaryColor,
          },
        },
      },
    },
  },
});
