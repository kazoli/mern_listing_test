import { useEffect } from 'react';

type tProps = {
  children: React.ReactNode;
};

const PopUp: React.FC<tProps> = (props) => {
  useEffect(() => {
    // stop scrolling of body
    document.body.setAttribute('style', 'overflow: hidden');
    // set back scrolling of body
    return () => document.body.removeAttribute('style');
  }, []);

  return (
    <div className="overlay-container">
      <div className="popup-container scroll-bar">{props.children}</div>
    </div>
  );
};

export default PopUp;
