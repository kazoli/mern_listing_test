import { AiOutlineCloseCircle } from 'react-icons/ai';
import { tTaskFormData } from './TaskEditorPopup';

type tProps = {
  index: number;
  tag: string;
  formData: tTaskFormData;
  setFormData: React.Dispatch<React.SetStateAction<tTaskFormData>>;
};

const TagEditor: React.FC<tProps> = ({ index, tag, formData, setFormData }) => {
  return (
    <div className="tag-form-block">
      <div
        className="icon-wrapper circle click"
        title="Remove tag"
        onClick={() =>
          setFormData({
            ...formData,
            tags: formData.tags.filter((tagCurr, indexCurr) => indexCurr !== index),
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
          setFormData({
            ...formData,
            tags: formData.tags.map((tagCurr, indexCurr) =>
              indexCurr === index ? e.target.value : tagCurr,
            ),
          })
        }
        value={tag}
      />
    </div>
  );
};

export default TagEditor;
