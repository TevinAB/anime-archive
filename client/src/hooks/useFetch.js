import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

/**
 * Fetches data from a given path.
 * @param {*} path - The path to fetch from.
 * @returns An object with fields {data, isLoading, error}.
 */
function useFetch(path) {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const cancelToken = useRef(null);

  useEffect(() => {
    async function getData() {
      if (!path) return;
      try {
        setLoading(true);
        //If there is a cancel token, call cancel
        if (cancelToken.current) cancelToken.current.cancel();

        //save the cancel token that represents the next request
        cancelToken.current = axios.CancelToken.source();

        const response = await axios.get(path, {
          cancelToken: cancelToken.current.token,
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        //Only set error if its not an error from cancelling the axios request
        if (!axios.isCancel(error)) {
          setError(true);
          setLoading(false);
        }
      }
    }

    getData();
  }, [path]);

  return { data, isLoading, error };
}

export default useFetch;
