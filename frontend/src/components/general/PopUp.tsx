type tProps = {
  children: React.ReactNode;
};

const PopUp: React.FC<tProps> = (props) => {
  return (
    <div className="overlay-container">
      <div className="popup-container">{props.children}</div>
    </div>
  );
};

export default PopUp;
