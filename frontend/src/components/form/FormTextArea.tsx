import TextareaAutosize from 'react-textarea-autosize';

type tProps = {
  label: string;
  minLength: number;
  maxLength: number;
  value: string;
  action: (value: string) => void;
  error: string;
  placeholder?: string;
  preventEnter?: boolean;
};

const FormTextArea: React.FC<tProps> = (props) => {
  return (
    <div className="form-block">
      <label>{props.label}</label>
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
    </div>
  );
};

export default FormTextArea;
