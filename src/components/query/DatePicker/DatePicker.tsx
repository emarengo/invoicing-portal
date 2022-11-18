import { ChangeEvent, FocusEvent, useState, useEffect } from 'react';
import { QueryError } from '../../../models';
import { getMaxDate } from '../../../helpers';

interface DatePickerProps {
  errors: QueryError;
  updateData: (name: string, value: string) => void;
  updateErrors: (name: string, error: boolean, message: string) => void;
}

const DatePicker = ({ errors, updateData, updateErrors }: DatePickerProps) => {
  const [dates, setDates] = useState({
    startDate: '',
    endDate: ''
  });
  const [startDateGreater, setStartDateGreater] = useState(false);
  const handleOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setDates((date) => ({ ...date, [name]: value }));
    updateData(name, value);
  };

  const handleOnBlur = ({ target }: FocusEvent<HTMLInputElement>) => {
    const { name, value } = target;
    if (!value) {
      updateErrors(name, true, 'This is input is required');
    } else updateErrors(name, false, '');
  };

  const dateProps = {
    className: 'form-control query-date-input',
    type: 'date',
    required: true,
    onChange: handleOnChange,
    onBlur: handleOnBlur
  };

  const startDateProps = {
    name: 'startDate',
    id: 'startDate',
    'data-testid': 'startDate',
    ...dateProps
  };

  const endDateProps = {
    name: 'endDate',
    id: 'endDate',
    'data-testid': 'endDate',
    max: getMaxDate(dates.startDate),
    ...dateProps
  };

  useEffect(() => {
    if (dates.startDate && dates.endDate) {
      if (
        new Date(dates.startDate).getTime() > new Date(dates.endDate).getTime()
      )
        setStartDateGreater(true);
      else setStartDateGreater(false);
    }
  });
  return (
    <>
      <div className="col-12 col-sm-12 col-md-6 col-xl-4">
        <span className="asterisc-required">Ride Start Date</span>
        <input {...startDateProps} />
        <small className="text-danger">
          {errors.startDate.hasError && errors.startDate.errorMessage}
        </small>
        {startDateGreater && (
          <span className="d-flex mt-1 justify-content-center text-danger">
            Start date can&apos;t be greater than end date
          </span>
        )}
      </div>
      <div className="col-12 col-sm-12 col-md-6 col-xl-4">
        <span className="asterisc-required">Ride End Date</span>
        <input {...endDateProps} />
        <small className="text-danger">
          {errors.endDate.hasError && errors.endDate.errorMessage}
        </small>
      </div>
    </>
  );
};

export default DatePicker;
