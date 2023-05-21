import TextareaAutosize from 'react-textarea-autosize';

type tProps = {
  label: string;
  minLength: number;
  maxLength: number;
  value: string;
  action: (value: string) => void;
  preventEnter?: boolean;
};

const FormTextArea: React.FC<tProps> = (props) => {
  return (
    <section className="form-block">
      <label>{props.label}</label>
      <TextareaAutosize
        className="form-name-element autosize"
        placeholder={`From ${props.minLength} to ${props.maxLength} characters`}
        minLength={props.minLength}
        maxLength={props.maxLength}
        onKeyDown={(e) => (props.preventEnter && e.key === 'Enter' ? e.preventDefault() : e)}
        onChange={(e) => props.action(e.target.value)}
        value={props.value}
      />
    </section>
  );
};

export default FormTextArea;
