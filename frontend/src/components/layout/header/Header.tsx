import { useEffect, useState } from 'react';
import HeaderLogo from './HeaderLogo';
import HeaderMenu from './HeaderMenu';

const Header: React.FC = () => {
  const initialClass = '';
  const [positionClass, setpositionClass] = useState(initialClass);
  const hideMenu = initialClass === positionClass ? initialClass : 'hidden';

  // header show only at up scrolling
  useEffect(() => {
    const prev = { top: window.scrollY, positionClass: initialClass };
    const updateScrollDirection = () => {
      const currPositionClass = window.scrollY > prev.top ? 'header-hidden' : initialClass;
      if (prev.positionClass !== currPositionClass) {
        // scroll direction change
        setpositionClass(currPositionClass);
        prev.positionClass = currPositionClass;
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
    <header className={`${positionClass}`}>
      <div className="layout-positioner header-inside-wrapper">
        <HeaderLogo />
        <HeaderMenu hideMenu={hideMenu} />
      </div>
    </header>
  );
};

export default Header;
