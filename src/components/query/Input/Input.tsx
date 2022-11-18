import { ChangeEvent, FocusEvent } from 'react';
import { QueryError } from '../../../models';
import { validatePattern } from '../../../helpers';

interface InputProps {
  type: string; // This is in case input will be text and check for validation
  pattern: string;
  inputTitle: string;
  name: string;
  errors: QueryError;
  updateData: (name: string, value: string) => void;
  updateErrors: (name: string, error: boolean, message: string) => void;
}

const Input = ({
  type,
  pattern,
  inputTitle,
  name,
  errors,
  updateData,
  updateErrors
}: InputProps) => {
  const handleTextChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    updateData(name, value);
  };

  type ObjectKey = keyof typeof errors;

  const handleOnBlur = ({ target }: FocusEvent<HTMLInputElement>) => {
    const { name, value } = target;
    if (value)
      if (!validatePattern(value, pattern))
        updateErrors(name, true, 'Only numbers are allowed');
      else updateErrors(name, false, '');
  };

  const inputProps = {
    className: `form-control ${
      errors[name as ObjectKey].hasError && 'input-error'
    } query-input-number`,
    type,
    name,
    'data-testid': name,
    onChange: handleTextChange,
    onBlur: handleOnBlur
  };
  return (
    <div className="col-sm-12 col-md-6 col-xl-4">
      <span>{inputTitle}</span>
      <div className="input-container">
        <input {...inputProps} />
        <small className="text-danger">
          {errors[name as ObjectKey].hasError &&
            errors[name as ObjectKey].errorMessage}
          {/* This error is in case the input will be a text type and needs to be validated */}
        </small>
      </div>
    </div>
  );
};

export default Input;
