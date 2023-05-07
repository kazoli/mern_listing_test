import { AiOutlineDownCircle, AiOutlineRightCircle } from 'react-icons/ai';
import { tCollectionQueryParts } from '../../app/collection/collectionTypes';
import { tTaskQueryParts } from '../../app/task/taskTypes';

type tProps = {
  selected: string;
  options: { [key: string]: string };
  selectAction: (value: string) => void | {
    payload: {
      queryPart: keyof tCollectionQueryParts | keyof tTaskQueryParts;
      value: string;
      refreshPage: boolean;
    };
    type: string;
  };
};

const DropDownMenu: React.FC<tProps> = (props) => {
  return (
    <nav className="drop-down-menu">
      <label className="icon-wrapper">
        <AiOutlineDownCircle className="icon" />
        <span>{props.options[props.selected]}</span>
      </label>
      <ul>
        {Object.keys(props.options).map(
          (key, index) =>
            key !== props.selected && (
              <li
                key={index}
                onClick={() => props.selectAction(key)}
                className="icon-wrapper click"
              >
                <AiOutlineRightCircle className="icon" />
                <span>{props.options[key]}</span>
              </li>
            ),
        )}
      </ul>
    </nav>
  );
};

export default DropDownMenu;
