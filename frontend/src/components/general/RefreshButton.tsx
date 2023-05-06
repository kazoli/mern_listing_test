type tProps = {
  action: () => {
    payload: undefined;
    type: string;
  };
};

const RefreshButton: React.FC<tProps> = ({ action }) => {
  return (
    <div className="refresh-button click" onClick={action}>
      Refresh sorting
    </div>
  );
};

export default RefreshButton;
