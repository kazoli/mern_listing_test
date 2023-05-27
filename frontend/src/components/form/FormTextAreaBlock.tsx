import TextareaAutosize from 'react-textarea-autosize';
import FormBlock from './FormBlock';

type tProps = {
  label: string;
  minLength: number;
  maxLength: number;
  value: string;
  action: (value: string) => void;
  error?: string;
  placeholder?: string;
  preventEnter?: boolean;
};

const FormTextAreaBlock: React.FC<tProps> = (props) => {
  return (
    <FormBlock label={props.label}>
      <>
        <TextareaAutosize
          className="form-element autosize"
          placeholder={props.placeholder}
          minLength={props.minLength}
          maxLength={props.maxLength}
          onKeyDown={(e) => (props.preventEnter && e.key === 'Enter' ? e.preventDefault() : e)}
          onChange={(e) => props.action(e.target.value)}
          value={props.value}
        />
        {props.error && <div className="form-error">{props.error}</div>}
      </>
    </FormBlock>
  );
};

export default FormTextAreaBlock;
