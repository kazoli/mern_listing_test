import { useAppDispatch } from '../../app/general/hooks';
import { deleteTask, updateTask } from '../../app/task/taskThunks';
import { toogleEditor } from '../../app/task/taskSlice';
import { AiOutlineCheck, AiOutlineDelete, AiOutlineEdit, AiOutlineReload } from 'react-icons/ai';
import { tTaskData, tTaskState } from '../../app/task/taskTypes';

type tProps = {
  index: number;
  task: tTaskData;
  highlighted: tTaskState['highlighted'];
};

const Task: React.FC<tProps> = ({ index, task, highlighted }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={highlighted === task._id ? 'list-wrapper highlighted' : 'list-wrapper'}>
      <div className="list-element-top-part">
        <div className="list-element-title">{task.name}</div>
        <div className="list-element-feature-wrapper">
          <p>
            <label>Created</label>
            <span>
              {new Date(task.createdAt).toLocaleDateString('en-gb', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </span>
          </p>
          <p>
            <label>Updated</label>
            <span>
              {new Date(task.updatedAt).toLocaleDateString('en-gb', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </span>
          </p>
          <p>
            <label>Status</label>
            {task.complete ? <span className="green">Complete</span> : <span>Incomplete</span>}
          </p>
        </div>
        {task.tags.length > 0 && (
          <div className="list-element-tag-wrapper">
            {task.tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div className="list-element-icon-wrapper">
        {task.complete ? (
          <AiOutlineReload
            className="icon click"
            title="Reopen task"
            onClick={() => dispatch(updateTask({ ...task, complete: false }))}
          />
        ) : (
          <>
            <AiOutlineCheck
              className="icon click"
              title="Complete task"
              onClick={() => dispatch(updateTask({ ...task, complete: true }))}
            />
            <AiOutlineEdit
              className="icon click"
              title="Edit task"
              onClick={() => dispatch(toogleEditor(index))}
            />
          </>
        )}
        <AiOutlineDelete
          className="icon click"
          title="Delete task"
          onClick={() => dispatch(deleteTask(task._id))}
        />
      </div>
    </div>
  );
};

export default Task;
