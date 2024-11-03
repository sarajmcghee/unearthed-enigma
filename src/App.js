import React from 'react';
import ThreeCanvas from './components/ThreeCanvas';

function App() {
  return (
    <div className="App">
      <ThreeCanvas />
      
      {/* Placeholder sections */}
      <section style={sectionStyle}>
        <h1>Welcome to UnearthedEnigma</h1>
        <p>This is the beginning of an amazing scroll experience!</p>
      </section>

      <section style={sectionStyle}>
        <h1>Section 2</h1>
        <p>More content here to continue the scroll. This could be anything you want!</p>
      </section>

      <section style={sectionStyle}>
        <h1>Section 3</h1>
        <p>This is additional placeholder text to test the scrolling effect.</p>
      </section>

      <section style={sectionStyle}>
        <h1>Section 4</h1>
        <p>Yet another section with some text. Keep scrolling!</p>
      </section>

      <section style={sectionStyle}>
        <h1>Final Section</h1>
        <p>This is the last placeholder section. The end of the scroll!</p>
      </section>
    </div>
  );
}

const sectionStyle = {
  padding: '50px',
  textAlign: 'center',
  backgroundColor: '#f4f4f4',
  margin: '20px 0',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
};

export default App;
