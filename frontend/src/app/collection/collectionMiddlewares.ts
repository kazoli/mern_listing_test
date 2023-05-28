import { validateText } from '../general/validations';
import { collectionFormLabels, collectionValidationLimits } from './collectionInitialStates';
import { tCollectionDataErrors, tCollectionDataSave } from './collectionTypes';

// Collection form validation
export const collectionValidateForm = (
  formData: tCollectionDataSave,
  setFormErrors: React.Dispatch<React.SetStateAction<tCollectionDataErrors>>,
) => {
  const name = validateText(
    collectionFormLabels.name,
    formData.name,
    collectionValidationLimits.minName,
    collectionValidationLimits.maxName,
  );
  setFormErrors({ name });
  return !name;
};
