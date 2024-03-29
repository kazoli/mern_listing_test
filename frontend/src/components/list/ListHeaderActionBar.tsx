import { tButton, tListHeaderActionDropDowns } from '../../app/general/types';
import { AiOutlinePlusCircle, AiOutlineRightCircle } from 'react-icons/ai';
import DropDownMenu from '../general/DropDownMenu';
import DropDownListLabel from '../general/DropDownListLabel';
import ButtonIcon from '../general/ButtonIcon';

type tProps = {
  buttons: tButton[];
  dropDowns: tListHeaderActionDropDowns;
};

const ListHeaderActionBar: React.FC<tProps> = (props) => {
  return (
    <div className="list-header-action-bar">
      <div className="list-header-action-block">
        {props.buttons.map((button) => (
          <ButtonIcon
            key={button.text}
            text={button.text}
            action={button.action}
            icon={<AiOutlinePlusCircle className="icon" />}
          />
        ))}
      </div>
      <div className="list-header-action-block">
        {props.dropDowns.map((dropDown) => (
          <DropDownMenu
            key={dropDown.triggerText}
            wrapperClass="list-drop-down-wrapper"
            listClass="list-drop-down-menu"
            optionClass="icon-wrapper click"
            trigger={<DropDownListLabel text={dropDown.triggerText} />}
            ignoredOption={dropDown.ignoredOption}
            options={dropDown.options}
            action={dropDown.action}
            optionIcon={<AiOutlineRightCircle className="icon" />}
          />
        ))}
      </div>
    </div>
  );
};

export default ListHeaderActionBar;
