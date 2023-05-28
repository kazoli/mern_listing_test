import { tInput } from '../../app/general/types';
import FormBlock from './FormBlock';
import FromInputElement from './FromInputElement';

type tProps = tInput & {
  label: string;
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
