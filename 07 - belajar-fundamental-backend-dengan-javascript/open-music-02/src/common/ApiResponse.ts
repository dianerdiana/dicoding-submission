interface ApiResponseProps {
  status?: string;
  data?: any;
  message?: string;
  code?: number;
}

export class ApiResponse implements ApiResponseProps {
  public readonly _isApiResponse = true;
  public readonly status?: string;
  public readonly data?: any;
  public readonly message?: string;
  public readonly code: number;

  constructor(props: ApiResponseProps) {
    const { message, data, status = 'success', code = 200 } = props;

    this.status = status;
    this.data = data;
    this.message = message;
    this.code = code;
  }
}
