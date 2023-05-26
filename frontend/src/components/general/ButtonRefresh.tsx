type tProps = {
  action: () => void;
};

const ButtonRefresh: React.FC<tProps> = (props) => {
  return (
    <div className="refresh-button click" onClick={props.action}>
      Refresh list
    </div>
  );
};

export default ButtonRefresh;
