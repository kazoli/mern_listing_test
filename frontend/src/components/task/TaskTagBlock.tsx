import React from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { taskFormLabels, taskValidationLimits } from '../../app/task/taskInitialStates';
import { tTaskDataSave } from '../../app/task/taskTypes';
import TagEditor from './TaskTagEditor';
import ButtonIcon from '../general/ButtonIcon';
import FormBlock from '../form/FormBlock';

type tProps = {
  tags: tTaskDataSave['tags'];
  setFormData: React.Dispatch<React.SetStateAction<tTaskDataSave>>;
};

const TaskTagBlock: React.FC<tProps> = (props) => {
  return (
    <FormBlock label={taskFormLabels.tags}>
      <>
        <div className="form-element">
          {props.tags.length < taskValidationLimits.totalTag ? (
            <ButtonIcon
              text="Add a new tag"
              action={() =>
                props.setFormData((prevState) => ({
                  ...prevState,
                  tags: ['', ...prevState.tags],
                }))
              }
            />
          ) : (
            <div className="icon-wrapper warning">
              <AiOutlineExclamationCircle className="icon" />
              <span>{`Maximum ${taskValidationLimits.totalTag} tags can be added to a task`}</span>
            </div>
          )}
          {props.tags.length > 0 && (
            <div className="form-multi-line-block">
              {props.tags.map((tag, index) => (
                <TagEditor
                  key={index}
                  index={index}
                  tag={tag}
                  tags={props.tags}
                  setFormData={props.setFormData}
                />
              ))}
            </div>
          )}
        </div>
      </>
    </FormBlock>
  );
};

export default TaskTagBlock;
