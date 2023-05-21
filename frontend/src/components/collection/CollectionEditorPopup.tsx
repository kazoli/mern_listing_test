import { useEffect, useState } from 'react';
import { tCollectionData } from '../../app/collection/collectionTypes';
import { createCollection, updateCollection } from '../../app/collection/collectionThunks';
import {
  collectionToogleEditor,
  collectionToogleHighlighted,
} from '../../app/collection/collectionSlice';
import { useAppDispatch } from '../../app/general/hooks';
import { processName } from '../../app/general/validations';
import FormTextArea from '../form/FormTextArea';
import FromButton from '../form/FromButton';
import PopUp from '../general/PopUp';

type tProps = {
  collection: tCollectionData | false;
};

type tCollectionFormData = {
  _id: tCollectionData['_id'];
  name: tCollectionData['name'];
};

const CollectionEditorPopup: React.FC<tProps> = ({ collection }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<tCollectionFormData>({
    _id: '',
    name: '',
  });
  const validation = {
    name: { minLength: 3, maxLength: 50 },
  };
  const onSubmit = () => {
    // validation name
    if (!processName(formData.name, validation.name)) {
      return;
    }
    // highlight the updated collection
    if (collection) {
      dispatch(collectionToogleHighlighted(collection._id));
    }
    // udpate or create a collection
    dispatch(formData._id ? updateCollection(formData) : createCollection(formData));
  };
  const buttons = [
    {
      label: 'Save',
      action: onSubmit,
    },
    {
      label: 'Cancel',
      action: () => dispatch(collectionToogleEditor(false)),
    },
  ];

  useEffect(() => {
    // existing collection data load into form
    if (collection) {
      setFormData({
        _id: collection._id,
        name: collection.name,
      });
    }
  }, [collection]);

  return (
    <PopUp>
      <FormTextArea
        label="Collection name"
        minLength={3}
        maxLength={50}
        value={formData.name}
        action={(value) =>
          setFormData({
            ...formData,
            name: value,
          })
        }
        preventEnter={true}
      />
      <FromButton buttons={buttons} />
    </PopUp>
  );
};

export default CollectionEditorPopup;
