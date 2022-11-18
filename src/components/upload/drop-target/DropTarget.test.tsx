import { fireEvent, render, screen } from '@testing-library/react';
import DropTarget from './DropTarget';

test('should render the component', () => {
  render(
    <DropTarget
      onDrop={() => {
        return;
      }}
    >
      <span>Rendered</span>
    </DropTarget>
  );

  const target = screen.getByText('Rendered');
  expect(target).toBeInTheDocument();
});

test('should change styles when file is over', () => {
  const { container } = render(
    <DropTarget
      onDrop={() => {
        return;
      }}
    >
      <span>Rendered</span>
    </DropTarget>
  );

  const target = container.firstChild as HTMLDivElement;
  fireEvent.dragEnter(target);
  fireEvent.dragOver(target, {
    dataTransfer: {}
  });
  expect(target).toHaveClass('active');
});

test('should remove active styles when file leaves', () => {
  const { container } = render(
    <DropTarget
      onDrop={() => {
        return;
      }}
    >
      <span>Rendered</span>
    </DropTarget>
  );

  const target = container.firstChild as HTMLDivElement;
  fireEvent.dragEnter(target);
  fireEvent.dragOver(target, {
    dataTransfer: {}
  });
  fireEvent.dragLeave(target);
  expect(target).not.toHaveClass('active');
});
