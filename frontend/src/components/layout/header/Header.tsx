import { useEffect, useState } from 'react';
import HeaderLogo from './HeaderLogo';
import HeaderProfile from './HeaderProfile';

const Header: React.FC = () => {
  const [position, setPosition] = useState('');

  // header show only at up scrolling
  useEffect(() => {
    const prev = { top: window.scrollY, position: '' };
    const updateScrollDirection = () => {
      const currPosition = window.scrollY > prev.top ? 'hidden' : '';
      if (prev.position !== currPosition) {
        // scroll direction change
        setPosition(currPosition);
        prev.position = currPosition;
      }
      prev.top = window.scrollY;
    };
    window.addEventListener('scroll', updateScrollDirection);
    return () => {
      // unmount
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, []);

  return (
    <header className={`${position}`}>
      <div className="layout-positioner header-inside-wrapper">
        <HeaderLogo />
        <HeaderProfile />
      </div>
    </header>
  );
};

export default Header;
