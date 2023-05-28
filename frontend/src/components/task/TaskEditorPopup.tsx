import { useEffect, useState } from 'react';
import { tTaskData, tTaskDataErrors, tTaskDataSave } from '../../app/task/taskTypes';
import { taskFormLabels, taskValidationLimits } from '../../app/task/taskInitialStates';
import { createTask, updateTask } from '../../app/task/taskThunks';
import { taskToogleEditor, taskToogleHighlighted } from '../../app/task/taskSlice';
import { useAppDispatch } from '../../app/general/hooks';
import { taskValidateForm } from '../../app/task/taskMiddlewares';
import PopUp from '../general/PopUp';
import FormTextAreaBlock from '../form/FormTextAreaBlock';
import FormButtonBlock from '../form/FormButtonBlock';
import TaskTagBlock from './TaskTagBlock';

type tProps = {
  task: tTaskData | false;
  collection_id: tTaskData['collection_id'];
};

const TaskEditorPopup: React.FC<tProps> = (props) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<tTaskDataSave>({
    _id: '',
    collection_id: props.collection_id,
    name: '',
    tags: [],
    complete: false,
  });
  const [formErrors, setFormErrors] = useState<tTaskDataErrors>({
    name: '',
    tags: [],
  });

  const onSubmit = () => {
    if (taskValidateForm(formData, setFormErrors)) {
      // highlight the updated task
      if (props.task) {
        dispatch(taskToogleHighlighted(props.task._id));
      }
      // udpate or create a task
      dispatch(formData._id ? updateTask(formData) : createTask(formData));
    }
  };

  const buttons = [
    {
      text: 'Save',
      action: onSubmit,
    },
    {
      text: 'Cancel',
      action: () => dispatch(taskToogleEditor(false)),
    },
  ];

  useEffect(() => {
    // existing task data load into form
    if (props.task) {
      setFormData({
        _id: props.task._id,
        collection_id: props.task.collection_id,
        name: props.task.name,
        tags: props.task.tags,
        complete: props.task.complete,
      });
    }
  }, [props.task]);

  return (
    <PopUp>
      <FormTextAreaBlock
        label={taskFormLabels.name}
        placeholder={`From ${taskValidationLimits.minName} to ${taskValidationLimits.maxName} characters`}
        minLength={taskValidationLimits.minName}
        maxLength={taskValidationLimits.maxName}
        value={formData.name}
        action={(value) =>
          setFormData((prevState) => ({
            ...prevState,
            name: value,
          }))
        }
        preventEnter={true}
        error={formErrors.name}
      />
      <TaskTagBlock
        tags={formData.tags}
        setFormData={setFormData}
        errors={formErrors.tags}
        setFormErrors={setFormErrors}
      />
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
};

export default TaskEditorPopup;
