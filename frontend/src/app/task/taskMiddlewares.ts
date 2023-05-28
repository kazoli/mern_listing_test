import { validateText } from '../general/validations';
import { taskFormLabels, taskValidationLimits } from './taskInitialStates';
import { tTaskDataErrors, tTaskDataSave } from './taskTypes';

// Task form validation
export const taskValidateForm = (
  formData: tTaskDataSave,
  setFormErrors: React.Dispatch<React.SetStateAction<tTaskDataErrors>>,
) => {
  const name = validateText(
    taskFormLabels.name,
    formData.name,
    taskValidationLimits.minName,
    taskValidationLimits.maxName,
  );
  let tagError = false;
  const tags: tTaskDataErrors['tags'] = [];
  formData.tags.forEach((tag) => {
    const error = validateText(
      taskFormLabels.tags,
      tag,
      taskValidationLimits.minTag,
      taskValidationLimits.maxTag,
    );
    tags.push(error);
    if (!tagError && error) {
      tagError = true;
    }
  });
  setFormErrors({ name, tags });
  return !name && !tagError;
};
