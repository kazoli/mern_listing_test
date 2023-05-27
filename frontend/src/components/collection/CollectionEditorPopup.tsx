import { useEffect, useState } from 'react';
import { tCollectionData, tCollectionDataSave } from '../../app/collection/collectionTypes';
import {
  collectionFormLabels,
  collectionValidationLimits,
} from '../../app/collection/collectionInitialStates';
import { createCollection, updateCollection } from '../../app/collection/collectionThunks';
import {
  collectionToogleEditor,
  collectionToogleHighlighted,
} from '../../app/collection/collectionSlice';
import { useAppDispatch } from '../../app/general/hooks';
import { collectionValidateForm } from '../../app/collection/collectionMiddlewares';
import PopUp from '../general/PopUp';
import FormTextAreaBlock from '../form/FormTextAreaBlock';
import FormButtonBlock from '../form/FormButtonBlock';

type tProps = {
  collection: tCollectionData | false;
};

const CollectionEditorPopup: React.FC<tProps> = (props) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<tCollectionDataSave>({
    _id: '',
    name: '',
  });
  const [formErrors, setFormErrors] = useState<tCollectionDataSave>({
    _id: '',
    name: '',
  });

  const onSubmit = () => {
    collectionValidateForm(formData, setFormErrors).then((submit) => {
      if (submit) {
        // highlight the updated collection
        if (props.collection) {
          dispatch(collectionToogleHighlighted(props.collection._id));
        }
        // udpate or create a collection
        dispatch(formData._id ? updateCollection(formData) : createCollection(formData));
      }
    });
  };

  const buttons = [
    {
      text: 'Save',
      action: onSubmit,
    },
    {
      text: 'Cancel',
      action: () => dispatch(collectionToogleEditor(false)),
    },
  ];

  useEffect(() => {
    // existing collection data load into form
    if (props.collection) {
      setFormData({
        _id: props.collection._id,
        name: props.collection.name,
      });
    }
  }, [props.collection]);

  return (
    <PopUp>
      <FormTextAreaBlock
        label={collectionFormLabels.name}
        placeholder={`From ${collectionValidationLimits.minName} to ${collectionValidationLimits.maxName} characters`}
        minLength={collectionValidationLimits.minName}
        maxLength={collectionValidationLimits.maxName}
        value={formData.name}
        action={(value) =>
          setFormData({
            ...formData,
            name: value,
          })
        }
        preventEnter={true}
        error={formErrors.name}
      />
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
};

export default CollectionEditorPopup;
