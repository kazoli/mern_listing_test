type tProps = {
  buttons: { label: string; action: () => void }[];
};

const FromButton: React.FC<tProps> = (props) => {
  return (
    <section className="from-button-wrapper">
      {props.buttons.map((button) => (
        <button className="form-button click" onClick={button.action}>
          {button.label}
        </button>
      ))}
    </section>
  );
};

export default FromButton;
