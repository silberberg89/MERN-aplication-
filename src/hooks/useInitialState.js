import { useState, useEffect } from 'react';

const useInitialState = (API) => {
  const [data, setData] = useState({
    results: [],
  });

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then(setData);
  }, []);
  return data;
};

export default useInitialState;
