import { AiOutlineCloseCircle } from "react-icons/ai";
import { tsTaskFormData } from "./TaskEditorPopup";

interface tsProps {
  index: number;
  tag: string;
  formData: tsTaskFormData;
  setFormData: React.Dispatch<React.SetStateAction<tsTaskFormData>>;
}

const TagEditor: React.FC<tsProps> = ({
  index,
  tag,
  formData,
  setFormData,
}) => {
  return (
    <div className="tag-editor-wrapper">
      <div
        className="icon-wrapper circle click"
        title="Remove tag"
        onClick={() =>
          setFormData({
            ...formData,
            tags: formData.tags.filter(
              (tagCurr, indexCurr) => indexCurr !== index
            ),
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
              indexCurr === index ? e.target.value : tagCurr
            ),
          })
        }
        value={tag}
      />
    </div>
  );
};

export default TagEditor;
