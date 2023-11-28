import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import AppHero from './components/hero';
import AppAbout from './components/about';
import AppHeader from './components/header';
import AppFooter from './components/footer';
import AppContact from './components/contact';
import AppServices from './components/services';
import AppTestimonials from './components/testimonials';


export default function App() {
  return (
    <div className="App">
      <header id='header'>
        <AppHeader />
      </header>
      <main>
        <AppHero />
        <AppAbout />
        <AppServices />
        <AppTestimonials />
        <AppContact />
      </main>
      <footer id="footer">
        <AppFooter />
      </footer>
    </div>
  );
}
