import React, { useState, useEffect, useRef } from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import './App.css';

function App() {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [containerVisible, setContainerVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState(0);
  const sectionsRef = useRef([]);
  const lastScrollPosition = useRef(0);

  // Trigger container visibility after animation completes
  useEffect(() => {
    if (animationProgress >= 1 && !containerVisible) {
      setContainerVisible(true);
      console.log("Can has tipped over. Revealing sections container.");
    }
  }, [animationProgress, containerVisible]);

  // Incrementally show sections one by one once the container becomes visible
  useEffect(() => {
    if (containerVisible && visibleSections < 21) {
      lastScrollPosition.current = window.scrollY;

      const timer = setTimeout(() => {
        setVisibleSections((prev) => prev + 1);
        window.scrollTo(0, lastScrollPosition.current);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [containerVisible, visibleSections]);

  return (
    <div className="App">
      {/* Background canvas with can animation */}
      <ThreeCanvas animationProgress={animationProgress} setAnimationProgress={setAnimationProgress} />

      {/* Main container with sections and footer */}
      <div className="main-container">
        {/* Placeholder content before the animation completes */}
        {!containerVisible && (
          <div className="placeholder">
            <p>Placeholder content until animation completes...</p>
          </div>
        )}

{containerVisible && (
          <div className="placeholder">
            <p>Placeholder content until animation completes...</p>
          </div>
        )}


        {/* Footer remains at the bottom */}
        <footer className="footer">
          <h2>Footer Section</h2>
          <p>This is the footer at the end of the scrollable content.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
