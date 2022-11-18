import { render, screen } from '@testing-library/react';
import ResultsTable from './ResultsTable';

test('component should have title', () => {
  render(<ResultsTable title="test title" items={[]} values={[]} />);
  const header = screen.getByText('test title');
  expect(header).toBeInTheDocument();
});

test('component should have all headers', () => {
  const values = [
    {
      key: '1',
      label: 'test 1'
    },
    {
      key: '2',
      label: 'test 2'
    },
    {
      key: '3',
      label: 'test 3'
    }
  ];
  render(<ResultsTable title="test title" items={[]} values={values} />);
  expect(screen.getByText('test 1')).toBeInTheDocument();
  expect(screen.getByText('test 2')).toBeInTheDocument();
  expect(screen.getByText('test 3')).toBeInTheDocument();
});

test('component should have all items array of strings', () => {
  const items = ['item 1', 'item 2', 'item 3'];
  const values = [
    {
      label: ''
    }
  ];
  render(<ResultsTable title="test title" items={items} values={values} />);
  expect(screen.getByText('item 1')).toBeInTheDocument();
  expect(screen.getByText('item 2')).toBeInTheDocument();
  expect(screen.getByText('item 3')).toBeInTheDocument();
});

test('component should have all items array of objects', () => {
  const items = [
    {
      test: 'value 1',
      test2: 'value 2'
    }
  ];
  const values = [
    {
      key: 'test',
      label: ''
    },
    {
      key: 'test2',
      label: ''
    }
  ];
  render(<ResultsTable title="test title" items={items} values={values} />);
  expect(screen.getByText('value 1')).toBeInTheDocument();
  expect(screen.getByText('value 2')).toBeInTheDocument();
});
