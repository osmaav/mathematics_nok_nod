import { useEffect } from 'react';
import './App.css';
import { ActiveSectionProvider } from './contexts/ActiveSectionContext';
import Header from './sections/Header';
import Hero from './sections/Hero';
import TheoryIntro from './sections/TheoryIntro';
import NODTheory from './sections/NODTheory';
import NOKTheory from './sections/NOKTheory';
import Calculator from './sections/Calculator';
import Practice from './sections/Practice';
import Quiz from './sections/Quiz';
import Footer from './sections/Footer';

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <ActiveSectionProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <TheoryIntro />
          <NODTheory />
          <NOKTheory />
          <Calculator />
          <Practice />
          <Quiz />
        </main>
        <Footer />
      </div>
    </ActiveSectionProvider>
  );
}

export default App;
