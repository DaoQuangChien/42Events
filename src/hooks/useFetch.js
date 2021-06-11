import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();

        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);
  return { loading, data, error };
};

export default useFetch;
