import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import serviceOptions from 'src/helpers/service-options';
import ServiceDropdown from 'src/components/query/ServiceDropdown/ServiceDropdown';
import { QueryData } from 'src/models';

interface ServiceDropdownProps {
  showServices: boolean;
  setShowServices: (bool: boolean) => void;
  data: QueryData;
  updateData: (name: string, value: string[]) => void;
}

describe('Service dropdown test', () => {
  const serviceDropdownProps: ServiceDropdownProps = {
    showServices: false,
    setShowServices: jest.fn(),
    data: {
      serviceIds: [],
      startDate: '',
      endDate: '',
      rideId: '',
      driverId: '',
      userId: ''
    },
    updateData: jest.fn()
  };
  let component: RenderResult;

  const setup = (props: ServiceDropdownProps) =>
    (component = render(<ServiceDropdown {...props} />));

  afterEach(() => {
    jest.clearAllMocks();
    component.unmount();
  });

  it('renders the component correctly', () => {
    const { getByText } = setup(serviceDropdownProps);
    expect(getByText('Service')).toBeInTheDocument();
  });

  it('calls "setShowServices" function when clicking on the dropdown box', () => {
    const { getByText } = setup(serviceDropdownProps);
    const dropdown = getByText('Select');
    userEvent.click(dropdown);

    expect(serviceDropdownProps.setShowServices).toHaveBeenCalledTimes(1);
  });

  describe('When the user clicks', () => {
    const newServiceDropdownProps = {
      ...serviceDropdownProps,
      showServices: true
    };

    afterEach(() => {
      jest.clearAllMocks();
      component.unmount();
    });

    it('shows the dropdownList if "showServices" is set to true with the options unchecked', () => {
      const { getByTestId, getByText } = setup(newServiceDropdownProps);

      const dropdownList = getByText(serviceOptions[0].name);

      expect(dropdownList).toBeInTheDocument();

      serviceOptions.forEach((service) => {
        const checkbox = getByTestId(service.value) as HTMLInputElement;

        expect(checkbox.checked).toBe(false);
      });
    });

    it('calls "updateData" when the user clicks on one of the options from the dropdown', async () => {
      const { getByTestId } = setup(newServiceDropdownProps);

      const firstOption = getByTestId(serviceOptions[0].value);
      expect(firstOption).toBeInTheDocument();
      userEvent.click(firstOption);

      expect(newServiceDropdownProps.updateData).toHaveBeenCalledWith(
        'serviceIds',
        expect.arrayContaining(['6'])
      );

      const secondOption = getByTestId(serviceOptions[1].value);
      expect(secondOption).toBeInTheDocument();

      userEvent.click(secondOption);
      expect(newServiceDropdownProps.updateData).toHaveBeenCalledTimes(2);
      expect(newServiceDropdownProps.updateData).toHaveBeenCalledWith(
        'serviceIds',
        expect.arrayContaining(['11'])
      );
    });
  });
});
