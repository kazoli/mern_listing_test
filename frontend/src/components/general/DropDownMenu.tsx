type tProps<T> = {
  wrapperClass: string;
  listClass: string;
  optionClass: string;
  trigger: JSX.Element;
  options: T;
  action: (value: keyof T) => void;
  ignoredOption?: string;
  optionIcon?: JSX.Element;
};

const DropDownMenu = <T extends { [key: string]: string }>(props: tProps<T>) => {
  return (
    <div className={props.wrapperClass}>
      {props.trigger}
      <ul className={props.listClass}>
        {Object.keys(props.options).map(
          (key) =>
            props.ignoredOption !== key && (
              <li key={key} className={props.optionClass} onClick={() => props.action(key)}>
                {props.optionIcon}
                <span>{props.options[key]}</span>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default DropDownMenu;
