type tProps = {
  wrapperClass: string;
  optionClass: string;
  trigger: JSX.Element;
  options: { [key: string]: string };
  action: (value: string) => void;
  optionIcon?: JSX.Element;
};

const DropDownMenu: React.FC<tProps> = (props) => {
  return (
    <div className={props.wrapperClass}>
      {props.trigger}
      <ul>
        {Object.keys(props.options).map((key) => (
          <li key={key} className={props.optionClass} onClick={() => props.action(key)}>
            {props.optionIcon}
            <span>{props.options[key]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownMenu;
