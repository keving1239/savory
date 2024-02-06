import { createTheme } from "@mui/material/styles";

export const Theme = createTheme({
    palette: {
        primary: {
            light: '#acb493',
            main: '#606c38',
            dark: '#283618',
            contrastText: '#fff',
        },
        secondary: {
            light: '#dda15e',
            main: '#fca311',
            dark: '#bc6c25',
            contrastText: '#000',
        },
        background: {
            default: '#fefae0',
        }, 
    },
    spacing: 10
});

export default Theme;