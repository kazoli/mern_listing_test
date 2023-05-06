import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/general/hooks';
import { tCollectionData } from '../../app/collections/collectionTypes';
import { createCollection, updateCollection } from '../../app/collections/collectionThunks';
import { toogleEditor, toogleHighlighted } from '../../app/collections/collectionSlice';
import { processName } from '../../app/general/validations';
import TextareaAutosize from 'react-textarea-autosize';

type tProps = {
  collection: tCollectionData | false;
};

type tCollectionFormData = {
  _id: tCollectionData['_id'];
  name: tCollectionData['name'];
};

const CollectionEditorPopup: React.FC<tProps> = ({ collection }) => {
  const dispatch = useAppDispatch();
  const validation = {
    name: { minLength: 3, maxLength: 50 },
  };
  const [formData, setFormData] = useState<tCollectionFormData>({
    _id: '',
    name: '',
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
    dispatch(formData._id ? updateCollection(formData) : createCollection(formData));
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
            onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : e)}
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
          <button className="button click" onClick={() => dispatch(toogleEditor(false))}>
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
};

export default CollectionEditorPopup;
