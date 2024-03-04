import { PaletteMode } from '@mui/material';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ThemeState {
    mode: PaletteMode,
}

const initialState: ThemeState = {
  mode: 'light',
};

export const themeSlice = createSlice({
  name: 'theme-slice',
  initialState,
  reducers: {
    setThemeMode: (state: ThemeState, action:PayloadAction<{mode: PaletteMode}>) => {
      state.mode = action.payload.mode;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;