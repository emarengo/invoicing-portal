import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Upload from './Upload';
import { readCSV } from '../../services/file';
import { bulkUpload, csvToDriverList } from '../../services/driver';
import { AxiosError, AxiosResponse } from 'axios';

jest.mock('../../services/file');
jest.mock('../../services/driver');

test('To check file uploaded', () => {
  const file = new File(
    ['driver_id, facturify_id \n 1,1 \n 2,2'],
    'drivers.csv',
    { type: 'file' }
  );

  render(<Upload />);

  const input = screen.getByLabelText(/here/i);
  userEvent.upload(input, file);
  /**
   * Needs file this way because is not taking it from DOM
   *
   * @ts-expect-error */
  expect(input.files[0].type).toStrictEqual('file');
  /**
   * Needs file this way because is not taking it from DOM
   *
   * @ts-expect-error */
  expect(input.files[0].name).toBe('drivers.csv');
  /**
   * Needs file this way because is not taking it from DOM
   *
   * @ts-expect-error */
  expect(input.files[0].name).toContain('.csv');
  /**
   * Needs file this way because is not taking it from DOM
   *
   * @ts-expect-error */
  expect(input.files).toHaveLength(1);
});

test('Check if button activates when uploaded', () => {
  const file = new File(
    ['driver_id, facturify_id \n 1,1 \n 1,1'],
    'drivers.csv',
    { type: 'file' }
  );

  render(<Upload />);

  const input = screen.getByLabelText(/here/i);
  userEvent.upload(input, file);
  expect(screen.getByText('Upload')).toBeEnabled();
});

test('display error if upload fails', async () => {
  const file = new File(
    ['driver_id, facturify_id \n 1,1 \n 1,1'],
    'drivers.csv',
    { type: 'file' }
  );

  (readCSV as jest.MockedFn<typeof readCSV>).mockRejectedValue(
    new ProgressEvent('error')
  );

  render(<Upload />);

  const button = screen.getByText('Upload');
  const input = screen.getByLabelText(/here/i);

  act(() => userEvent.upload(input, file));
  act(() => userEvent.click(button));

  const alert = await screen.findByText('Error loading drivers.csv');
  expect(alert).toBeInTheDocument();
});

test('display error if csv is an empty list', async () => {
  const file = new File(
    ['driver_id, facturify_id \n 1,1 \n 1,1'],
    'drivers.csv',
    { type: 'file' }
  );

  (readCSV as jest.MockedFn<typeof readCSV>).mockResolvedValue('');
  (csvToDriverList as jest.MockedFn<typeof csvToDriverList>).mockReturnValue(
    []
  );

  render(<Upload />);

  const button = screen.getByText('Upload');
  const input = screen.getByLabelText(/here/i);

  act(() => userEvent.upload(input, file));
  act(() => userEvent.click(button));

  const alert = await screen.findByText('Empty CSV file.');
  expect(alert).toBeInTheDocument();
});

test('display error if csvToDriverList fails', async () => {
  const file = new File(
    ['driver_id, facturify_id \n 1,1 \n 1,1'],
    'drivers.csv',
    { type: 'file' }
  );

  (readCSV as jest.MockedFn<typeof readCSV>).mockResolvedValue('');
  (csvToDriverList as jest.MockedFn<typeof csvToDriverList>).mockImplementation(
    () => {
      throw new Error('Failed');
    }
  );

  render(<Upload />);

  const button = screen.getByText('Upload');
  const input = screen.getByLabelText(/here/i);

  act(() => userEvent.upload(input, file));
  act(() => userEvent.click(button));

  const alert = await screen.findByText('Failed');
  expect(alert).toBeInTheDocument();
});

test('display error if axios fails', async () => {
  const file = new File(
    ['driver_id, facturify_id \n 1,1 \n 1,1'],
    'drivers.csv',
    { type: 'file' }
  );

  (readCSV as jest.MockedFn<typeof readCSV>).mockResolvedValue('');
  (csvToDriverList as jest.MockedFn<typeof csvToDriverList>).mockReturnValue([
    {
      driver_id: 1234,
      facturify_id: 'test'
    }
  ]);
  (bulkUpload as jest.MockedFn<typeof bulkUpload>).mockRejectedValue(
    new AxiosError()
  );

  render(<Upload />);

  const button = screen.getByText('Upload');
  const input = screen.getByLabelText(/here/i);

  act(() => userEvent.upload(input, file));
  act(() => userEvent.click(button));

  const alert = await screen.findByText(
    'Error uploading file, please try again later.'
  );
  expect(alert).toBeInTheDocument();
});

test('display UploadResults if uploaded correctly', async () => {
  const file = new File(
    ['driver_id, facturify_id \n 1,1 \n 1,1'],
    'drivers.csv',
    { type: 'file' }
  );

  render(<Upload />);

  (readCSV as jest.MockedFn<typeof readCSV>).mockResolvedValue('');
  (csvToDriverList as jest.MockedFn<typeof csvToDriverList>).mockReturnValue([
    {
      driver_id: 1234,
      facturify_id: 'test'
    }
  ]);
  const response = {
    added: 0,
    updated: [],
    duplicated: [],
    facturify_duplicated: [],
    incorrect_driver: [],
    incorrect_facturify: []
  };
  (bulkUpload as jest.MockedFn<typeof bulkUpload>).mockResolvedValue({
    data: {
      data: response,
      errors: []
    }
  } as AxiosResponse);

  const button = screen.getByText('Upload');
  const input = screen.getByLabelText(/here/i);

  act(() => userEvent.upload(input, file));
  act(() => userEvent.click(button));

  const upload = await screen.findByText('Result');
  expect(upload).toBeInTheDocument();
});

test('hide error message after click in close button', async () => {
  const file = new File(
    ['driver_id, facturify_id \n 1,1 \n 1,1'],
    'drivers.csv',
    { type: 'file' }
  );

  (readCSV as jest.MockedFn<typeof readCSV>).mockRejectedValue(
    new ProgressEvent('error')
  );

  const { container } = render(<Upload />);

  const button = screen.getByText('Upload');
  const input = screen.getByLabelText(/here/i);

  act(() => userEvent.upload(input, file));
  act(() => userEvent.click(button));

  const alert = await screen.findByText('Error loading drivers.csv');
  const close = container.querySelector(
    'button.btn-close'
  ) as HTMLButtonElement;
  act(() => userEvent.click(close));
  expect(alert).not.toBeInTheDocument();
});

test('show file name when file is dropped', async () => {
  const file = new File(
    ['driver_id, facturify_id \n 1,1 \n 1,1'],
    'drivers.csv',
    { type: 'file' }
  );

  const { container } = render(<Upload />);

  const dropTarget = container.querySelector('.drop-target') as HTMLDivElement;
  fireEvent.drop(dropTarget, {
    dataTransfer: {
      files: [file],
      clearData: () => {
        return;
      }
    }
  });
  const fileName = await screen.findByText('drivers.csv');
  expect(fileName).toBeInTheDocument();
});
