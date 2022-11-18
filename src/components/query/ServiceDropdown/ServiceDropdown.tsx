import { ChangeEvent, MouseEvent } from 'react';
import serviceOptions from '../../../helpers/service-options';

import { QueryData, ServiceOption } from '../../../models';

interface ServiceDropdownProps {
  showServices: boolean;
  setShowServices: (bool: boolean) => void;
  data: QueryData;
  updateData: (name: string, value: string[]) => void;
}

const ServiceDropdown = ({
  showServices,
  setShowServices,
  data,
  updateData
}: ServiceDropdownProps) => {
  const handleDropdownClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowServices(!showServices);
  };

  const handleLabelClick = (e: MouseEvent<HTMLLabelElement>) =>
    e.stopPropagation();

  const handleInputOnChange = (
    { target }: ChangeEvent<HTMLInputElement>,
    service: ServiceOption
  ) => {
    const { value } = target;
    if (target.checked) updateData('serviceIds', [...data.serviceIds, value]);
    else
      updateData('serviceIds', [
        ...data.serviceIds.filter(
          (selectedOptions) => selectedOptions !== service.id
        )
      ]);
  };

  const checkboxDropdownProps = {
    className: `checkbox-dropdown form-control ${showServices && 'is-active'}`,
    onClick: handleDropdownClick
  };

  const labelProps = {
    className: 'services-label',
    onClick: handleLabelClick
  };

  return (
    <div className="col-sm-12 col-md-6 col-xl-4">
      Service
      <div {...checkboxDropdownProps}>
        <span>Select</span>
        {showServices && (
          <ul className="checkbox-dropdown-list">
            {serviceOptions.map((service: ServiceOption) => (
              <li className="list-group" key={service.id}>
                <label {...labelProps}>
                  <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputOnChange(e, service)
                    }
                    type="checkbox"
                    data-testid={service.value}
                    value={service.id}
                    name={service.name}
                    checked={data.serviceIds.includes(service.id)}
                  />
                  <span>{service.name}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ServiceDropdown;
