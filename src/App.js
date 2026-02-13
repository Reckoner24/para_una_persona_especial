import React, { useState } from 'react';
import './App.css';
import LockScreen from './components/LockScreen';
import MainPage from './components/MainPage';

function App() {
  const [isLocked, setIsLocked] = useState(true);

  const handleUnlock = () => {
    setIsLocked(false);
  };

  return (
    <div className="App">
      {isLocked ? (
        <LockScreen onUnlock={handleUnlock} />
      ) : (
        <MainPage />
      )}
    </div>
  );
}

export default App;
