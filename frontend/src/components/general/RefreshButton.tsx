type tProps = {
  action: () => {
    payload: undefined;
    type: string;
  };
};

const RefreshButton: React.FC<tProps> = (props) => {
  return (
    <div className="refresh-button click" onClick={props.action}>
      Refresh list
    </div>
  );
};

export default RefreshButton;
