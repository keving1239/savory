import { createTheme, responsiveFontSizes  } from "@mui/material/styles";
import "@fontsource/montserrat";
import { PaletteMode } from "@mui/material";

declare module '@mui/material/styles' {
    interface Palette {
        cream: Palette['primary'];
    }
  
    interface PaletteOptions {
        cream?: PaletteOptions['primary'];
    }
}
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

const getPaletteColors = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light') ? {
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
                paper: '#f4f4f5'
            },
            cream: {
                light: '#fefae0',
                main: '#fefae0',
                dark: '#fefae0',
                contrastText: '#000',
            }
        } : {
            primary: {
                light: '#859064',
                main: '#A0B175',
                dark: '#C9D2B1',
                contrastText: '#000',
            },
            secondary: {
                light: '#FFCA85',
                main: '#FFA733',
                dark: '#8d5801',
                contrastText: '#000',
            },
            background: {
                default: '#343638',
                paper: '#141415',
            },
            cream: {
                light: '#fefae0',
                main: '#fefae0',
                dark: '#fefae0',
                contrastText: '#000',
            }
        }
    }
});
const getThemeOptions = () => (
    {
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
    }
);

export default function createAppTheme(mode: PaletteMode) {
    const colorTheme = createTheme(getPaletteColors(mode));
    const standardTheme = createTheme(colorTheme, getThemeOptions());
    const Theme = responsiveFontSizes(standardTheme);
    return Theme;
}