import { AiOutlineDownCircle, AiOutlineRightCircle } from 'react-icons/ai';
import { tCollectionQueryParts } from '../../app/collections/collectionTypes';
import { tTaskQueryParts } from '../../app/tasks/taskTypes';

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

const DropDownMenu: React.FC<tProps> = ({ selected, options, selectAction }) => {
  return (
    <nav className="drop-down-menu">
      <label className="icon-wrapper">
        <AiOutlineDownCircle className="icon" />
        <span>{options[selected]}</span>
      </label>
      <ul>
        {Object.keys(options).map(
          (key, index) =>
            key !== selected && (
              <li key={index} onClick={() => selectAction(key)} className="icon-wrapper click">
                <AiOutlineRightCircle className="icon" />
                <span>{options[key]}</span>
              </li>
            ),
        )}
      </ul>
    </nav>
  );
};

export default DropDownMenu;
