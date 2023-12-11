/* eslint-disable import/no-unresolved */

import './global.css';
import Router from "./routes/sections";
import ThemeProvider from './theme/index.j';
import { useScrollToTop } from './hooks/use-scroll-to-top.j';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
