export interface Driver {
  driver_id: number;
  facturify_id: string;
}

export interface BulkResponse {
  added: number;
  updated: Driver[];
  duplicated: {
    driver_id: number;
    existing_facturify_id: string;
    given_facturify_id: string;
  }[];
  facturify_duplicated: string[];
  incorrect_driver: string[];
  incorrect_facturify: string[];
}
