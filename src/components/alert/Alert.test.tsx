import { render, screen } from '@testing-library/react';
import Alert, { AlertType } from './Alert';

describe('Alert', () => {
  it('should add class alert-dismissible if handleClose is provided', () => {
    render(
      <Alert
        type={AlertType.Primary}
        onClose={() => {
          return;
        }}
      >
        <div></div>
      </Alert>
    );

    expect(screen.getByRole('alert')).toHaveClass('alert-dismissible');
  });

  it('should have close button if handleClose is provided', () => {
    render(
      <Alert
        type={AlertType.Primary}
        onClose={() => {
          return;
        }}
      >
        <div></div>
      </Alert>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should have class alert-primary if type is Primary', () => {
    render(
      <Alert type={AlertType.Primary}>
        <div></div>
      </Alert>
    );

    expect(screen.getByRole('alert')).toHaveClass('alert-primary');
  });

  it('should have class alert-secondary if type is Secondary', () => {
    render(
      <Alert type={AlertType.Secondary}>
        <div></div>
      </Alert>
    );

    expect(screen.getByRole('alert')).toHaveClass('alert-secondary');
  });

  it('should have class alert-success if type is Success', () => {
    render(
      <Alert type={AlertType.Success}>
        <div></div>
      </Alert>
    );

    expect(screen.getByRole('alert')).toHaveClass('alert-success');
  });

  it('should have class alert-danger if type is Danger', () => {
    render(
      <Alert type={AlertType.Danger}>
        <div></div>
      </Alert>
    );

    expect(screen.getByRole('alert')).toHaveClass('alert-danger');
  });

  it('should have class alert-warning if type is Warning', () => {
    render(
      <Alert type={AlertType.Warning}>
        <div></div>
      </Alert>
    );

    expect(screen.getByRole('alert')).toHaveClass('alert-warning');
  });

  it('should have class alert-info if type is Info', () => {
    render(
      <Alert type={AlertType.Info}>
        <div></div>
      </Alert>
    );

    expect(screen.getByRole('alert')).toHaveClass('alert-info');
  });

  it('should have class alert-light if type is Light', () => {
    render(
      <Alert type={AlertType.Light}>
        <div></div>
      </Alert>
    );

    expect(screen.getByRole('alert')).toHaveClass('alert-light');
  });

  it('should have class alert-dark if type is Dark', () => {
    render(
      <Alert type={AlertType.Dark}>
        <div></div>
      </Alert>
    );

    expect(screen.getByRole('alert')).toHaveClass('alert-dark');
  });
});
