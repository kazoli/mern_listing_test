import FormBlock from './FormBlock';
import FromInputElement from './FromInputElement';

type tProps = {
  label: string;
  type: string;
  value: string;
  action: (value: string) => void;
  error: string;
  autocomplete?: string;
  placeholder?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
};

const FormInputBlock: React.FC<tProps> = (props) => {
  const { label, ...elementProps } = props;

  return (
    <FormBlock label={label}>
      <FromInputElement {...elementProps} />
    </FormBlock>
  );
};

export default FormInputBlock;
