import { FormEvent, useState } from 'react';
import { AxiosError } from 'axios';
import { BulkResponse } from '../../models/driver';
import Alert, { AlertType } from '../alert/Alert';
import { bulkUpload, csvToDriverList } from '../../services/driver';
import { readCSV } from '../../services/file';
import DropTarget from './drop-target/DropTarget';

import './Upload.scss';
import { ReactComponent as UploadIcon } from '../../images/svg/upload.svg';
import UploadResults from './upload-results/UploadResults';
import Spinner from '../spinner/Spinner';

const Upload = () => {
  const [file, setFile] = useState<File | undefined>();
  const [uploadResult, setUploadResult] = useState<BulkResponse>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleFileSelected(event: FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setFile(file);
  }

  async function uploadFile() {
    setIsLoading(true);

    try {
      const csvData = await readCSV(file as File);
      const drivers = csvToDriverList(csvData);
      if (drivers.length) {
        const { data } = await bulkUpload(drivers);
        setUploadResult(data.data);
      } else {
        setError('Empty CSV file.');
      }
    } catch (error) {
      if (error instanceof ProgressEvent) {
        setError(`Error loading ${file?.name}`);
      } else if (error instanceof AxiosError) {
        setError('Error uploading file, please try again later.');
      } else {
        setError((error as Error).message);
      }
    }

    setIsLoading(false);
  }

  const alertProps = {
    type: AlertType.Danger,
    onClose: () => setError(undefined)
  };

  const dropTargetProps = {
    onDrop: setFile
  };

  const fileInputProps = {
    type: 'file',
    className: 'file-input',
    id: 'upload-input',
    accept: 'text/csv',
    onChange: handleFileSelected
  };

  const uploadButton = {
    className: 'btn btn-primary success-button',
    onClick: uploadFile,
    disabled: !file
  };

  return (
    <div className="container upload-uuids">
      {error ? (
        <div className="row">
          <div className="col mt-3">
            <Alert {...alertProps}>
              <span>{error}</span>
            </Alert>
          </div>
        </div>
      ) : null}
      <div className="row">
        <div className="col-12 mb-5 text-center">
          <h1>{uploadResult ? 'Result' : 'Upload your file'}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3 text-center">
          <strong>
            Upload the information as a csv file with the following structure
          </strong>
        </div>
      </div>
      <div className="row">
        <div className="col-5 mx-auto mb-5">
          <table className="table table-bordered text-center">
            <thead>
              <tr className="table-secondary">
                <th>driver_id</th>
                <th>driver_uuid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>123456</td>
                <td>c6d88b49-1b81-4e94-acc1-44f6656baf99</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {uploadResult ? (
            <UploadResults data={uploadResult} />
          ) : (
            <DropTarget {...dropTargetProps}>
              <div className="card-body text-center d-flex justify-content-center align-items-center">
                <div>
                  <span>
                    <UploadIcon /> Drop csv file or click{' '}
                  </span>
                  <label htmlFor="upload-input" className="file-input-label">
                    here
                  </label>
                  <input {...fileInputProps} /> to select it.
                  <div className="pt-2">
                    {file && (
                      <span>
                        <strong>Selected file:</strong> {file['name']}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </DropTarget>
          )}
        </div>
      </div>
      <div className="row text-center mt-5 gap-3">
        {!uploadResult && (
          <>
            <div className="col-12">
              <button {...uploadButton}>Upload</button>
            </div>
            {isLoading && <Spinner />}
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;
