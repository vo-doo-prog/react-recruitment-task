/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useCallback, useEffect } from "react";

export type ErrorMessage = string | null;

export interface UseFetchProps<T extends (...args: any[]) => Promise<any>> {
  callback: T;
  parameters: Parameters<T>;
  skip?: boolean;
}

export interface UseFetchOutput<T> {
  data: T | null;
  loading: boolean;
  errorMessage: ErrorMessage;
  retry: VoidFunction;
}

export const useFetch = <T extends (...args: any[]) => Promise<any>>({
  callback,
  parameters,
  skip = false,
}: UseFetchProps<T>): UseFetchOutput<Awaited<ReturnType<T>>> => {
  const [data, setData] = useState<Awaited<ReturnType<T>> | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(null);

  const handleFetch = useCallback(() => {
    setData(null);
    setLoading(true);
    setErrorMessage(null);

    callback(...parameters)
      .then((result) => {
        setLoading(false);
        setData(result);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error?.message ?? "Unknown error");
      });
  }, [callback, ...parameters]);

  useEffect(() => {
    // NOTE: `skip` is not added to the dependencies intentionally
    if (skip) return;
    handleFetch();
  }, [handleFetch]);

  return { data, loading, errorMessage, retry: handleFetch };
};
