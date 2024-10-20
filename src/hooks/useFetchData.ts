import { useEffect, useState } from "react";

interface UseFetchResult<T> {
  data: T[] | null;
  error: Error | null;
  loading: boolean;
}

function useFetchData<T>(...urls: string[]): UseFetchResult<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(urls.map((url) => fetch(url)));

        const result = await Promise.all(
          responses.map((response) => response.json())
        );
        setData(result);
        console.log("result", result);
      } catch (err) {
        if (err) {
          setError(err as Error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urls]);

  return { data, error, loading };
}

export default useFetchData;
