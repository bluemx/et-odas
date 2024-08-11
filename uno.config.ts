import { defineConfig } from "unocss";
import safelist from './uno-safelist.json';


export default defineConfig({
  safelist,
  theme: {
    colors: {
      etLight: '#f7f7f7',
      etDark: '#250004',
      etSilver: '#6f6f6e',
      etPink: '#e95364',
      etCarrot: '#e86432',
      etOrange: '#ef8e33',
      etGolden: '#fcc600',
      etGreen: '#afc41c',
      etCyan: '#2b82cc',
    },
  }
});