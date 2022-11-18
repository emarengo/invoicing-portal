export interface ApiError{
    errors: Array<{
        status: string;
        title: string;
        detail: string;
    }>
}