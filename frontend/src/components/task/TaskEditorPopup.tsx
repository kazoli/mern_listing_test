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
import FormButtonBlock from '../form/FormButtonBlock';

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

const TaskEditorPopup: React.FC<tProps> = (props) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<tTaskFormData>({
    _id: '',
    collection_id: props.collection_id,
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
    if (props.task) {
      dispatch(taskToogleHighlighted(props.task._id));
    }
    // udpate or create a task
    dispatch(formData._id ? updateTask(formData) : createTask(formData));
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
      <FormTextArea
        label="Task name"
        placeholder={`From ${3} to ${50} characters`}
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
        error=""
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
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
};

export default TaskEditorPopup;
