import { useEffect, useState } from 'react';
import { AiOutlineUpCircle } from 'react-icons/ai';
import { scrollToElement } from '../../../app/general/middlewares';

const JumpTop: React.FC = () => {
  const [jumpTop, setJumpTop] = useState(false);

  useEffect(() => {
    // scroll handling function
    const handleScroll = () => {
      const overLimit = window.scrollY > 200;
      // triggers setJumpTop only when previous value is changing
      overLimit !== jumpTop && setJumpTop(overLimit);
    };
    // event listener
    window.addEventListener('scroll', handleScroll);
    // cleanup function
    return () => window.removeEventListener('scroll', handleScroll);
  }, [jumpTop]);

  return (
    <>
      {jumpTop && (
        <AiOutlineUpCircle
          className="jump-top"
          title="Jump top"
          onClick={() => scrollToElement('smooth')}
        />
      )}
    </>
  );
};

export default JumpTop;
