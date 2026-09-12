import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './App.css';
import AppHero from './components/hero';
import AppHeader from './components/header';
import AppFooter from './components/footer';
import AppContact from './components/contact';
import AppTech from './components/tech';
import AppFeatures from './components/features';
import AppTryIt from './components/try-it';

// ----------------------------------------------------------------------

export default function App() {
  const { hash } = useLocation();

  // The app already scrolls to top on route change, so in-page anchors are
  // resolved here instead of pulling in an extra scroll library.
  useEffect(() => {
    if (!hash) {
      return undefined;
    }

    const target = document.getElementById(hash.slice(1));

    if (!target) {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <div className="famas-landing">
      <a className="famas-skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="famas-header">
        <AppHeader />
      </header>

      <main id="main-content">
        <AppHero />
        <AppFeatures />
        <AppTryIt />
        <AppTech />
        <AppContact />
      </main>

      <AppFooter />
    </div>
  );
}
