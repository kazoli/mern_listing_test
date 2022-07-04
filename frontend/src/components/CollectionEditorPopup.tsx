import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import {
  createCollection,
  updateCollection,
} from "../app/collections/collectionService";
import { toogleEditor, toogleHighlighted } from "../app/collections/collectionSlice";
import { tsCollectionData } from "../app/collections/collectionTypes";
import { tsDispatch } from "../app/store";
import { processName } from "../app/validations/validationRules";

interface tsProps {
  collection: tsCollectionData | false;
}

interface tsCollectionFormData {
  _id: tsCollectionData["_id"];
  name: tsCollectionData["name"];
}

const CollectionEditorPopup: React.FC<tsProps> = ({ collection }) => {
  const dispatch = useDispatch<tsDispatch>();
  const validation = {
    name: { minLength: 3, maxLength: 50 },
  };
  const [formData, setFormData] = useState<tsCollectionFormData>({
    _id: "",
    name: "",
  });

  useEffect(() => {
    // existing collection data load into form
    if (collection) {
      setFormData({
        _id: collection._id,
        name: collection.name,
      });
    }
  }, [collection]);

  const onSubmit = () => {
    // validation name
    if (!processName(formData.name, validation.name)) return;
    // highlight the updated collection
    if (collection) dispatch(toogleHighlighted(collection._id));
    // udpate or create a collection
    dispatch(
      formData._id ? updateCollection(formData) : createCollection(formData)
    );
  };

  return (
    <div className="overlay-container">
      <div className="editor-container">
        <section className="editor-wrapper">
          <label>Collection name</label>
          <TextareaAutosize
            className="form-name-element autosize"
            placeholder="Maximum 50 characters"
            minLength={3}
            maxLength={50}
            onKeyDown={(e) => (e.key === "Enter" ? e.preventDefault() : e)}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            value={formData.name}
          />
        </section>
        <section className="button-wrapper">
          <button className="button click" onClick={onSubmit}>
            Save
          </button>
          <button
            className="button click"
            onClick={() => dispatch(toogleEditor(false))}
          >
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
};

export default CollectionEditorPopup;
