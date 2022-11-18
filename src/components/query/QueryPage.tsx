import { useState, useRef, useEffect, MouseEvent } from 'react';
import axios from 'axios';

import { ServiceDropdown, DatePicker, Input } from './index';
import Spinner from '../spinner/Spinner';

import { useQuery } from './hooks/useQuery';

import { fieldsPassedValidation, inputNumberPattern } from 'src/helpers';
import { InvoiceService } from 'src/services/invoice';

import './QueryPage.scss';

const QueryPage = () => {
  const startDate = useRef<HTMLInputElement>();
  const endDate = useRef<HTMLInputElement>();

  const { data, errors, updateData, updateErrors } = useQuery();

  const [showServices, setShowServices] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [responseError, setResponseError] = useState<Array<string>>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setButtonDisabled(!fieldsPassedValidation(data));
  });

  useEffect(() => {
    if (startDate.current && endDate.current) {
      startDate.current.value = '';
      endDate.current.value = '';
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const clickOutside = (e: Event) => {
      e.stopPropagation();
      setShowServices(false);
    };

    document.addEventListener('click', clickOutside);

    return () => {
      document.removeEventListener('click', clickOutside);
    };
  });

  const ServiceDropdownProps = {
    showServices,
    setShowServices,
    data,
    updateData
  };

  const DatePickerProps = {
    errors,
    updateData,
    updateErrors
    //pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$',
  };

  const InputProps = {
    updateData,
    errors,
    updateErrors,
    type: 'text',
    pattern: inputNumberPattern
  };

  const RideProps = { ...InputProps, name: 'rideId', inputTitle: 'Ride ID' };
  const DriverProps = {
    ...InputProps,
    name: 'driverId',
    inputTitle: 'Driver ID'
  };
  const PassengerProps = {
    ...InputProps,
    name: 'userId',
    inputTitle: 'Passenger ID'
  };

  const ButtonProps = {
    className: 'btn success-button text-white',
    onClick: async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setResponseError([]);
      try {
        setButtonDisabled(true);
        setIsLoading(true);
        await InvoiceService.downloadCsv(data);
      } catch (err: any) {
        console.warn(err);
        if (axios.isAxiosError(err)) setResponseError([err.message]);
        else setResponseError([err.response?.errors[0]?.detail]);
      }
      setButtonDisabled(false);
      setIsLoading(false);
    },
    disabled: buttonDisabled,
    'data-testid': 'downloadButton'
  };
  return (
    <div className="container">
      <fieldset className="border border-dark mt-4 d-flex flex-column gap-4 pb-4 px-3 rounded px-xl-4 px-xxl-5">
        <div className="text-center filter-title">
          <span className="px-4 h3 bg-white">Filters</span>
        </div>
        <div className="d-flex flex-column gap-3">
          <div className="row justify-content-center g-3">
            <ServiceDropdown {...ServiceDropdownProps} />
            <DatePicker {...DatePickerProps} />
            <Input {...RideProps} />
            <Input {...DriverProps} />
            <Input {...PassengerProps} />
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="mx-auto">
              <button {...ButtonProps}>Download</button>
            </div>
            {responseError &&
              responseError.map((resError, index) => (
                <span key={index} className="text-danger text-center">
                  {resError}
                </span>
              ))}
            {isLoading && <Spinner />}
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default QueryPage;
