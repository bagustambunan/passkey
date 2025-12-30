import { useCallback, useEffect, useState } from "react";

type Statuses = "idle" | "pending" | "success" | "error";

type AsyncFunction<TParams extends unknown[], TData> = (
  ...params: TParams
) => Promise<TData>;

type AsyncResult<TParams extends unknown[], TData, TError> = {
  execute: AsyncFunction<TParams, TData | TError>;
  status: Statuses;
  value: TData | null;
  error: TError | null;
  isPending: boolean;
};

export const useAsync = <TParams extends unknown[], TData, TError>(
  asyncFunction: AsyncFunction<TParams, TData>,
  immidiate: false | TParams = false
): AsyncResult<TParams, TData, TError> => {
  const [status, setStatus] = useState<Statuses>("idle");
  const [value, setValue] = useState<TData | null>(null);
  const [error, setError] = useState<TError | null>(null);

  const execute = useCallback(
    async (...params: TParams) => {
      setStatus("pending");
      setError(null);
      return asyncFunction(...params)
        .then((response) => {
          setValue(response);
          setStatus("success");
          return response;
        })
        .catch((error) => {
          setError(error);
          setStatus("error");
          return error;
        });
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (immidiate) {
      execute(...immidiate);
    }
  }, [execute, immidiate]);

  return {
    execute,
    status,
    value,
    error,
    isPending: status === "pending",
  };
};
