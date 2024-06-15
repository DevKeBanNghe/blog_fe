import { useState, useEffect } from 'react';

const useScroll = () => {
  const [position, setPosition] = useState(0);

  const handleScroll = () => setPosition(window.scrollY);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { position, isScroll: position > 0 };
};

export default useScroll;
