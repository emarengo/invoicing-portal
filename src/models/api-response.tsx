export interface ApiResponse<T> {
  data: T;
  errors: {
    status: string;
    title: string;
    detail: string;
  }[];
}
