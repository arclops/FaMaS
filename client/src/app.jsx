/* eslint-disable import/no-unresolved */

import ThemeProvider from '@/theme';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';

import 'src/global.css';

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
