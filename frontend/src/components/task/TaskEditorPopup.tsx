import { useEffect, useState } from 'react';
import { AiOutlineExclamationCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { createTask, updateTask } from '../../app/task/taskThunks';
import { toogleEditor, toogleHighlighted } from '../../app/task/taskSlice';
import { tTaskData } from '../../app/task/taskTypes';
import { processName, processTags } from '../../app/general/validations';
import TagEditor from './TaskTagEditor';
import TextareaAutosize from 'react-textarea-autosize';
import { useAppDispatch } from '../../app/general/hooks';

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
  const validation = {
    name: { minLength: 3, maxLength: 200 },
    tag: { maxNumber: 20, minLength: 2, maxLength: 30 },
  };
  const [formData, setFormData] = useState<tTaskFormData>({
    _id: '',
    collection_id: collection_id,
    name: '',
    tags: [],
    complete: false,
  });

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

  const onSubmit = () => {
    // validation name
    if (!processName(formData.name, validation.name)) return;
    // validation tags
    if (formData.tags.length && !processTags(formData.tags, validation.tag)) return;
    // highlight the updated task
    if (task) dispatch(toogleHighlighted(task._id));
    // udpate or create a task
    dispatch(formData._id ? updateTask(formData) : createTask(formData));
  };

  return (
    <div className="overlay-container">
      <div className="editor-container">
        <section className="editor-wrapper">
          <label>Task name</label>
          <TextareaAutosize
            className="form-name-element autosize"
            placeholder="Maximum 200 characters"
            minLength={3}
            maxLength={200}
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
        <section className="editor-wrapper">
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

export default TaskEditorPopup;
