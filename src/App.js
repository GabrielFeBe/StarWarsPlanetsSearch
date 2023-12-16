import React from 'react';
import Home from './pages/Home';
import bgImage from './images/bgImage.png';

function App() {
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center pb-[45px]"
      style={ {
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      } }
    >
      <Home />
    </div>
  );
}

export default App;
