import { validateText } from '../general/validations';
import { collectionFormLabels, collectionValidationLimits } from './collectionInitialStates';
import { tCollectionDataSave } from './collectionTypes';

// Collection form validation
export const collectionValidateForm = async (
  formData: tCollectionDataSave,
  setFormErrors: React.Dispatch<React.SetStateAction<tCollectionDataSave>>,
) => {
  const name = await validateText(
    collectionFormLabels.name,
    formData.name,
    collectionValidationLimits.minName,
    collectionValidationLimits.maxName,
  );
  setFormErrors((prevState) => ({ ...prevState, name }));
  return !name;
};
