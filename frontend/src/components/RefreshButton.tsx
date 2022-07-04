interface tsProps {
  action: () => {
    payload: undefined;
    type: string;
  };
}

const RefreshButton: React.FC<tsProps> = ({ action }) => {
  return (
    <div className="refresh-button click" onClick={action}>
      Refresh sorting
    </div>
  );
};

export default RefreshButton;
