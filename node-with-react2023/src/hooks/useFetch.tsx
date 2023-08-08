import React, {useEffect, useState} from 'react'

// we need to accept argument as url for the fetch
// we need to return the data, isLoasding, error

type UseFetchProps<T> = {
    responseData: T | null;
    isLoading: boolean,
    error: undefined | null | string | unknown;
    refetchData: () => void;
}

async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    const data:Promise<T> = await response.json();
    return data;
  }

export default function useFetch<T>(url:string):UseFetchProps<T> {
    const [responseData, setResponseData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<undefined | null | string | unknown>(null);
    const fetchDataAndSetState = async () => {
        try {
          setIsLoading(true);
          const data = await fetchData<T>(url);
          setResponseData(data);
          setError(null);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };

    useEffect(() => {
    fetchDataAndSetState();
  }, [url]);

  // Function to refetch the data
  const refetchData = () => {
    fetchDataAndSetState();
  };

  return { responseData, isLoading, error, refetchData };
}

