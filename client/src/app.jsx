/* eslint-disable import/no-unresolved */

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import 'src/global.css';
import ThemeProvider from 'src/theme';

import Router from "./routes/sections";

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
