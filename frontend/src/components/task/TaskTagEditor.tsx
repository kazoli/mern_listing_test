import { AiOutlineCloseCircle } from 'react-icons/ai';
import { tTaskDataSave } from '../../app/task/taskTypes';

type tProps = {
  index: number;
  tag: string;
  tags: tTaskDataSave['tags'];
  setFormData: React.Dispatch<React.SetStateAction<tTaskDataSave>>;
};

const TagEditor: React.FC<tProps> = (props) => {
  return (
    <div className="form-multi-line">
      <div
        className="icon-wrapper circle click"
        title="Remove tag"
        onClick={() =>
          props.setFormData((prevState) => ({
            ...prevState,
            tags: props.tags.filter((_, indexCurr) => indexCurr !== props.index),
          }))
        }
      >
        <AiOutlineCloseCircle className="icon" />
      </div>
      <input
        placeholder="Maximum 30 characters"
        minLength={2}
        maxLength={30}
        onChange={(e) =>
          props.setFormData((prevState) => ({
            ...prevState,
            tags: props.tags.map((tagCurr, indexCurr) =>
              indexCurr === props.index ? e.target.value : tagCurr,
            ),
          }))
        }
        value={props.tag}
      />
    </div>
  );
};

export default TagEditor;
