import { createTheme, responsiveFontSizes  } from "@mui/material/styles";
import "@fontsource/montserrat";

// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
    interface Palette {
        cream: Palette['primary'];
    }
  
    interface PaletteOptions {
        cream?: PaletteOptions['primary'];
    }
  }
  
  // Update the Button's color options to include an ochre option
  declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        cream: true;
    }
  }
  declare module '@mui/material/TextField' {
    interface TextFieldPropsColorOverrides {
        cream: true;
    }
  }

const standardTheme = createTheme({
    palette: {
        primary: {
            light: '#acb493',
            main: '#606c38',
            dark: '#283618',
            contrastText: '#fff',
        },
        secondary: {
            light: '#fca311',
            main: '#ca7d02',
            dark: '#8d5801',
            contrastText: '#fff',
        },
        background: {
            default: '#fefae0',
        },
        cream: {
            light: '#fefae0',
            main: '#fefae0',
            dark: '#fefae0',
            contrastText: '#000',
        }
    },
    typography: {
        fontFamily: ['Montserrat', 'Roboto', 'Arial', 'sans-serif'].join(','),
        'fontWeightLight': 300,
        'fontWeightRegular': 400,
        'fontWeightMedium': 500,
    },
    components: {
        MuiAvatar: {
            defaultProps: {
                style: {
                    width: '4vh',
                    height: '4vh',
                    fontSize: '3vh',
                    backgroundColor: '#aaa',
                },
                
            }
        },
        MuiSvgIcon: {
            defaultProps: {
                style: {
                    width: '3.5vh',
                    height: '3.5vh',
                }
            }
        },
        MuiIconButton: {
            defaultProps: {
                style: {
                    padding: '1vh'
                }
            }
        },
    },
});

const Theme = responsiveFontSizes(standardTheme);

export default Theme;