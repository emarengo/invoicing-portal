export enum AlertType {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
  Light = 'light',
  Dark = 'dark'
}

interface AlertProps {
  type: AlertType;
  onClose?: () => void;
  children: JSX.Element;
}

const Alert = ({ type, onClose, children }: AlertProps) => {
  return (
    <div
      className={`alert alert-${type} ${!!onClose && 'alert-dismissible'}`}
      role="alert"
    >
      {children}
      {onClose && (
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
        />
      )}
    </div>
  );
};

export default Alert;
