import { useAppDispatch } from '../../app/general/hooks';
import { deleteTask, updateTask } from '../../app/task/taskThunks';
import { taskToogleEditor } from '../../app/task/taskSlice';
import { AiOutlineCheck, AiOutlineDelete, AiOutlineEdit, AiOutlineReload } from 'react-icons/ai';
import { tTaskData, tTaskState } from '../../app/task/taskTypes';
import { formatDate } from '../../app/general/middlewares';

type tProps = {
  index: number;
  task: tTaskData;
  highlighted: tTaskState['highlighted'];
};

const TaskListElement: React.FC<tProps> = (props) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={props.highlighted === props.task._id ? 'list-wrapper highlighted' : 'list-wrapper'}
    >
      <div className="list-element-top-wrapper">
        <div className="list-element-title">{props.task.name}</div>
        <div className="list-element-feature-wrapper">
          <p>
            <label>Created</label>
            <span>{formatDate(props.task.createdAt)}</span>
          </p>
          <p>
            <label>Updated</label>
            <span>{formatDate(props.task.updatedAt)}</span>
          </p>
          <p>
            <label>Status</label>
            {props.task.complete ? (
              <span className="green">Complete</span>
            ) : (
              <span>Incomplete</span>
            )}
          </p>
        </div>
        {props.task.tags.length > 0 && (
          <div className="list-element-tag-wrapper">
            {props.task.tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div className="list-element-icon-wrapper">
        {props.task.complete ? (
          <AiOutlineReload
            className="icon click"
            title="Reopen task"
            onClick={() => dispatch(updateTask({ ...props.task, complete: false }))}
          />
        ) : (
          <>
            <AiOutlineCheck
              className="icon click"
              title="Complete task"
              onClick={() => dispatch(updateTask({ ...props.task, complete: true }))}
            />
            <AiOutlineEdit
              className="icon click"
              title="Edit task"
              onClick={() => dispatch(taskToogleEditor(props.index))}
            />
          </>
        )}
        <AiOutlineDelete
          className="icon click"
          title="Delete task"
          onClick={() => dispatch(deleteTask(props.task._id))}
        />
      </div>
    </div>
  );
};

export default TaskListElement;
