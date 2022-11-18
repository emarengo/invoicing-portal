import { BulkResponse } from '../../../models/driver';
import ResultsTable, { ResultItem } from '../results-table/ResultsTable';

interface UploadResultsProps {
  data: BulkResponse;
}

const UploadResults = ({ data }: UploadResultsProps) => {
  const rows = [
    {
      title: 'Updated',
      items: data.updated as unknown as Record<string, string | number>[],
      values: [
        {
          key: 'driver_id',
          label: 'Driver ID'
        },
        {
          key: 'facturify_id',
          label: 'Facturify ID'
        }
      ]
    },
    {
      title: 'Duplicated Driver ID',
      items: data.duplicated,
      values: [
        {
          key: 'driver_id',
          label: 'Driver ID'
        },
        {
          key: 'existing_facturify_id',
          label: 'Existing Facturify ID'
        },
        {
          key: 'given_facturify_id',
          label: 'New Facturify ID'
        }
      ]
    },
    {
      title: 'Duplicated Facturify ID',
      items: data.facturify_duplicated,
      values: [
        {
          label: 'Facturify ID'
        }
      ]
    },
    {
      title: 'Incorrect Driver ID',
      items: data.incorrect_driver,
      values: [
        {
          label: 'Driver ID'
        }
      ]
    },
    {
      title: 'Incorrect Facturify ID',
      items: data.incorrect_facturify,
      values: [
        {
          label: 'Driver ID'
        }
      ]
    }
  ];

  return (
    <div className="container py-4">
      <div className="row pb-5">
        <h5>
          <strong>Created:</strong> {data.added}
        </h5>
      </div>
      {rows.map((row, index) => {
        if (!row.items.length) {
          return null;
        }
        return (
          <div className="row pb-5" key={index}>
            <div className="col">
              <ResultsTable
                title={row.title}
                items={row.items as (ResultItem | string)[]}
                values={row.values}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UploadResults;
