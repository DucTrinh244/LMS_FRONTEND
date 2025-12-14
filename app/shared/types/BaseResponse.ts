// Base Response Type for all API responses
export interface BaseResponse<T> {
  isSuccess: boolean;
  value: T | null;
  error: {
    statusCode: number;
    message: string;
  } | null;
}

