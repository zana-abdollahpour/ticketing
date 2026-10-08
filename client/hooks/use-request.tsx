import axios, { AxiosRequestConfig } from "axios";
import { ReactNode, useState } from "react";

interface ApiError {
  message: string;
}

interface ApiErrorResponse {
  errors: ApiError[];
}

interface UseRequestProps {
  url: string;
  method: "get" | "post" | "put" | "patch" | "delete";
  body?: unknown;
  onSuccess?: (data: unknown) => void;
}

export default function useRequest({
  url,
  method,
  body,
  onSuccess,
}: UseRequestProps) {
  const [errors, setErrors] = useState<ReactNode>(null);

  const doRequest = async (): Promise<unknown> => {
    try {
      setErrors(null);
      const response = await axios[method](url, body as AxiosRequestConfig);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        setErrors(
          <div className="alert alert-danger">
            <h4>Ooops....</h4>
            <ul className="my-0">
              {err.response?.data.errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>,
        );
      }
    }
  };

  return { doRequest, errors };
}
