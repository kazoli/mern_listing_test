import { validateText } from '../general/validations';
import { taskFormLabels, taskValidationLimits } from './taskInitialStates';
import { tTaskDataSave } from './taskTypes';

// Task form validation
export const taskValidateForm = async (
  formData: tTaskDataSave,
  setFormErrors: React.Dispatch<React.SetStateAction<tTaskDataSave>>,
) => {
  const name = await validateText(
    taskFormLabels.name,
    formData.name,
    taskValidationLimits.minName,
    taskValidationLimits.maxName,
  );
  setFormErrors((prevState) => ({ ...prevState, name }));
  return !name;
};
