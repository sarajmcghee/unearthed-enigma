import React, { useState, useEffect, useRef } from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import './App.css';

function App() {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [sectionsStartedLoading, setSectionsStartedLoading] = useState(false);
  const [visibleSections, setVisibleSections] = useState(0);
  const sectionsRef = useRef([]);
  const lastScrollPosition = useRef(0);

  // Trigger section reveal once animationProgress reaches the end for the first time
  useEffect(() => {
    if (animationProgress >= 1 && !sectionsStartedLoading) {
      setSectionsStartedLoading(true);
      console.log("Can has tipped over. Starting section reveal.");
    }
  }, [animationProgress, sectionsStartedLoading]);

  // Incrementally show sections one by one once the reveal starts, preserving scroll position
  useEffect(() => {
    if (sectionsStartedLoading && visibleSections < 21) {
      // Capture the current scroll position
      lastScrollPosition.current = window.scrollY;

      const timer = setTimeout(() => {
        setVisibleSections((prev) => prev + 1);

        // Restore the captured scroll position to prevent jump
        window.scrollTo(0, lastScrollPosition.current);
      }, 300); // Delay between sections (300ms)
      return () => clearTimeout(timer);
    }
  }, [sectionsStartedLoading, visibleSections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      {/* Background canvas */}
      <ThreeCanvas animationProgress={animationProgress} setAnimationProgress={setAnimationProgress} />

      {/* Spacer to push sections halfway down the screen */}
      <div style={spacerStyle}></div>

      {/* Persistent container to prevent layout shift */}
      <div style={placeholderContainerStyle}>
        {/* Placeholder content if animation isn't complete */}
        {!sectionsStartedLoading && (
          <div style={placeholderStyle}>
            <p>Placeholder content until animation completes...</p>
          </div>
        )}

        {/* Conditionally render content sections once animation has completed once */}
        {sectionsStartedLoading && (
          <>
            <section ref={(el) => (sectionsRef.current[0] = el)} className="content-section">
              <h1>Welcome to UnearthedEnigma</h1>
              <p>This is the beginning of an amazing scroll experience!</p>
            </section>

            {[...Array(4)].map((_, i) => (
              i < visibleSections && (
                <section
                  ref={(el) => (sectionsRef.current[i + 1] = el)}
                  className="content-section"
                  key={i}
                >
                  <h1>Section {i + 2}</h1>
                  <p>Placeholder content for section {i + 2}. Scroll to see more.</p>
                </section>
              )
            ))}
          </>
        )}
      </div>

      {/* Always render the footer */}
      <footer style={footerStyle}>
        <h2>Footer Section</h2>
        <p>This is the footer at the end of the scrollable content.</p>
      </footer>
    </div>
  );
}

// Spacer to initially push sections halfway down the screen
const spacerStyle = {
  height: '50vh',
  width: '100%',
};

// Persistent container to prevent layout shift
const placeholderContainerStyle = {
  minHeight: '100vh', // Ensures placeholder stays consistent in height
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const placeholderStyle = {
  height: '200vh',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  color: 'black',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const footerStyle = {
  padding: '50px',
  textAlign: 'center',
  backgroundColor: '#333',
  color: 'white',
  width: '100%',
};

export default App;
