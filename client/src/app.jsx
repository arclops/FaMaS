/* eslint-disable import/no-unresolved */

import '@/global.css';
import ThemeProvider from '@/theme';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';

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
