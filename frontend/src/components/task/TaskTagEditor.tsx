import { AiOutlineCloseCircle } from 'react-icons/ai';
import { tTaskFormData } from './TaskEditorPopup';

type tProps = {
  index: number;
  tag: string;
  formData: tTaskFormData;
  setFormData: React.Dispatch<React.SetStateAction<tTaskFormData>>;
};

const TagEditor: React.FC<tProps> = (props) => {
  return (
    <div className="tag-form-block">
      <div
        className="icon-wrapper circle click"
        title="Remove tag"
        onClick={() =>
          props.setFormData({
            ...props.formData,
            tags: props.formData.tags.filter((_, indexCurr) => indexCurr !== props.index),
          })
        }
      >
        <AiOutlineCloseCircle className="icon" />
      </div>
      <input
        placeholder="Maximum 30 characters"
        minLength={2}
        maxLength={30}
        onChange={(e) =>
          props.setFormData({
            ...props.formData,
            tags: props.formData.tags.map((tagCurr, indexCurr) =>
              indexCurr === props.index ? e.target.value : tagCurr,
            ),
          })
        }
        value={props.tag}
      />
    </div>
  );
};

export default TagEditor;
