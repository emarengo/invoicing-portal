import './DropTarget.scss';
import { DragEvent, useReducer } from 'react';

interface DropTargetProps {
  onDrop: (file: File) => void;
  children: JSX.Element;
}

interface DropTargetState {
  dropDepth: number;
  inDropZone: boolean;
  file?: File;
}

interface DropTargetAction extends DropTargetState {
  type: string;
}

const reducer = (state: DropTargetState, action: DropTargetAction) => {
  switch (action.type) {
    case 'SET_DROP_DEPTH':
      return { ...state, dropDepth: action.dropDepth };
    case 'SET_IN_DROP_ZONE':
      return { ...state, inDropZone: action.inDropZone };
    default:
      return state;
  }
};

const initialState = {
  dropDepth: 0,
  inDropZone: false
};

const DropTarget = ({ onDrop, children }: DropTargetProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleDragEnter(event: DragEvent<HTMLInputElement>): void {
    event.preventDefault();
    dispatch({
      ...state,
      type: 'SET_DROP_DEPTH',
      dropDepth: state.dropDepth + 1
    });
  }

  function handleDragLeave(event: DragEvent<HTMLInputElement>): void {
    event.preventDefault();
    const newDepth = state.dropDepth - 1;
    dispatch({ ...state, type: 'SET_DROP_DEPTH', dropDepth: newDepth });
    if (newDepth > 0) return;
    dispatch({ ...state, type: 'SET_IN_DROP_ZONE', inDropZone: false });
  }

  function handleDragOver(event: DragEvent<HTMLInputElement>): void {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    dispatch({ ...state, type: 'SET_IN_DROP_ZONE', inDropZone: true });
  }

  function handleDrop(event: DragEvent<HTMLInputElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    event.dataTransfer.clearData();
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 } as DropTargetAction);
    dispatch({ ...state, type: 'SET_IN_DROP_ZONE', inDropZone: false });
    onDrop(file);
  }

  const dropTargetProps = {
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
    className: `card bg-light drop-target ${state.inDropZone ? 'active' : ''}`
  };

  return <div {...dropTargetProps}>{children}</div>;
};

export default DropTarget;
