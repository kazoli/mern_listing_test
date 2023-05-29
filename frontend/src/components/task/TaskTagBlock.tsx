import { taskFormLabels, taskValidationLimits } from '../../app/task/taskInitialStates';
import { tTaskDataErrors, tTaskDataSave } from '../../app/task/taskTypes';
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import FormBlock from '../form/FormBlock';
import ButtonIcon from '../general/ButtonIcon';
import FormWarning from '../form/FormWarning';
import FromInputElement from '../form/FromInputElement';

type tProps = {
  tags: tTaskDataSave['tags'];
  setFormData: React.Dispatch<React.SetStateAction<tTaskDataSave>>;
  errors: tTaskDataErrors['tags'];
  setFormErrors: React.Dispatch<React.SetStateAction<tTaskDataErrors>>;
};

const TaskTagBlock: React.FC<tProps> = (props) => {
  return (
    <FormBlock label={taskFormLabels.tags}>
      <>
        <div className="form-element">
          {props.tags.length < taskValidationLimits.totalTag ? (
            <ButtonIcon
              text="Add a new tag"
              action={() => {
                props.setFormData((prevState) => ({
                  ...prevState,
                  tags: ['', ...prevState.tags],
                }));
                props.setFormErrors((prevState) => ({
                  ...prevState,
                  tags: ['', ...prevState.tags],
                }));
              }}
              icon={<AiOutlinePlusCircle className="icon" />}
            />
          ) : (
            <FormWarning
              text={`Maximum ${taskValidationLimits.totalTag} tags can be added to a task`}
            />
          )}
        </div>
        {props.tags.length > 0 && (
          <div className="form-multi-line-block scroll-bar">
            {props.tags.map((tag, index) => (
              <FromInputElement
                key={index}
                type="text"
                value={tag}
                action={(value) =>
                  props.setFormData((prevState) => ({
                    ...prevState,
                    tags: props.tags.map((tagCurr, indexCurr) =>
                      indexCurr === index ? value : tagCurr,
                    ),
                  }))
                }
                error={props.errors[index]}
                placeholder={`From ${taskValidationLimits.minTag} to ${taskValidationLimits.maxTag} characters`}
                leftIcon={
                  <ButtonIcon
                    action={() => {
                      props.setFormData((prevState) => ({
                        ...prevState,
                        tags: props.tags.filter((_, indexCurr) => indexCurr !== index),
                      }));
                      props.setFormErrors((prevState) => ({
                        ...prevState,
                        tags: props.errors.filter((_, indexCurr) => indexCurr !== index),
                      }));
                    }}
                    icon={<AiOutlineCloseCircle className="icon" />}
                  />
                }
              />
            ))}
          </div>
        )}
      </>
    </FormBlock>
  );
};

export default TaskTagBlock;
