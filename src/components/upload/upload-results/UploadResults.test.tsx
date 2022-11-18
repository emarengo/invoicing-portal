import { render, screen } from '@testing-library/react';
import UploadResults from './UploadResults';

const data = {
  incorrect_driver: [],
  incorrect_facturify: [],
  duplicated: [
    {
      driver_id: 0,
      existing_facturify_id: '00000000-0000-0000-0000-000000000000',
      given_facturify_id: '00000000-0000-0000-0000-000000000000'
    },
    {
      driver_id: 1,
      existing_facturify_id: '11111111-1111-1111-1111-111111111111',
      given_facturify_id: '44444444-4444-4444-4444-444444444444'
    },
    {
      driver_id: 2,
      existing_facturify_id: '22222222-2222-2222-2222-222222222222',
      given_facturify_id: '22222222-2222-2222-2222-222222222222'
    },
    {
      driver_id: 3,
      existing_facturify_id: '33333333-3333-3333-3333-333333333333',
      given_facturify_id: '55555555-5555-5555-5555-555555555555'
    }
  ],
  facturify_duplicated: [],
  added: 1,
  updated: []
};

test('To test the table creation', () => {
  render(<UploadResults data={data} />);
  const table = () => screen.findByTitle('tableResults');
  expect(table).toBeDefined();
});
