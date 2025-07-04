export type ErrorResponse = {
  message: string;
  status: boolean;
};

export type BaseResponse<T> = {
  status: string;
  message: string;
  data: T;
};
