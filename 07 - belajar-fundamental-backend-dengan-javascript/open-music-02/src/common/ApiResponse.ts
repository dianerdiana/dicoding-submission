interface ApiResponseProps<T = unknown> {
  status?: string;
  data?: T;
  message?: string;
  code?: number;
}

export class ApiResponse<T = unknown> implements ApiResponseProps<T> {
  public readonly _isApiResponse = true;
  public readonly status?: string;
  public readonly data?: T;
  public readonly message?: string;
  public readonly code: number;

  constructor(props: ApiResponseProps<T>) {
    const { message, data, status = 'success', code = 200 } = props;

    this.status = status;
    this.data = data;
    this.message = message;
    this.code = code;
  }
}
