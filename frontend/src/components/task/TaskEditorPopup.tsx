import { useEffect, useState } from 'react';
import { tTaskData } from '../../app/task/taskTypes';
import { createTask, updateTask } from '../../app/task/taskThunks';
import { taskToogleEditor, taskToogleHighlighted } from '../../app/task/taskSlice';
import { useAppDispatch } from '../../app/general/hooks';
import { processName, processTags } from '../../app/general/validations';
import { AiOutlineExclamationCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import PopUp from '../general/PopUp';
import TagEditor from './TaskTagEditor';
import FormTextArea from '../form/FormTextArea';
import FromButton from '../form/FromButton';

type tProps = {
  task: tTaskData | false;
  collection_id: tTaskData['collection_id'];
};

export type tTaskFormData = {
  _id: tTaskData['_id'];
  collection_id: tTaskData['collection_id'];
  name: tTaskData['name'];
  tags: tTaskData['tags'];
  complete: tTaskData['complete'];
};

const TaskEditorPopup: React.FC<tProps> = ({ task, collection_id }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<tTaskFormData>({
    _id: '',
    collection_id: collection_id,
    name: '',
    tags: [],
    complete: false,
  });
  const validation = {
    name: { minLength: 3, maxLength: 200 },
    tag: { maxNumber: 20, minLength: 2, maxLength: 30 },
  };
  const onSubmit = () => {
    // validation name
    if (!processName(formData.name, validation.name)) {
      return;
    }
    // validation tags
    if (formData.tags.length && !processTags(formData.tags, validation.tag)) {
      return;
    }
    // highlight the updated task
    if (task) {
      dispatch(taskToogleHighlighted(task._id));
    }
    // udpate or create a task
    dispatch(formData._id ? updateTask(formData) : createTask(formData));
  };
  const buttons = [
    {
      label: 'Save',
      action: onSubmit,
    },
    {
      label: 'Cancel',
      action: () => dispatch(taskToogleEditor(false)),
    },
  ];

  useEffect(() => {
    // existing task data load into form
    if (task) {
      setFormData({
        _id: task._id,
        collection_id: task.collection_id,
        name: task.name,
        tags: task.tags,
        complete: task.complete,
      });
    }
  }, [task]);

  return (
    <PopUp>
      <FormTextArea
        label="Task name"
        minLength={3}
        maxLength={200}
        value={formData.name}
        action={(value) =>
          setFormData({
            ...formData,
            name: value,
          })
        }
        preventEnter={true}
      />
      <section className="form-block">
        <label>Tags</label>
        {formData.tags.length < validation.tag.maxNumber ? (
          <div
            className="icon-wrapper click"
            onClick={() =>
              setFormData({
                ...formData,
                tags: ['', ...formData.tags],
              })
            }
          >
            <AiOutlinePlusCircle className="icon" />
            <span>Add a new tag</span>
          </div>
        ) : (
          <div className="icon-wrapper warning">
            <AiOutlineExclamationCircle className="icon" />
            <span>{`Maximum ${validation.tag.maxNumber} tags can be added to a task`}</span>
          </div>
        )}
        {formData.tags.length > 0 && (
          <div className="task-tag-edit-container">
            {formData.tags.map((tag, index) => (
              <TagEditor
                key={index}
                index={index}
                tag={tag}
                formData={formData}
                setFormData={setFormData}
              />
            ))}
          </div>
        )}
      </section>
      <FromButton buttons={buttons} />
    </PopUp>
  );
};

export default TaskEditorPopup;
