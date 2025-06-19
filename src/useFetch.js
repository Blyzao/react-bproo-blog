import { useState, useEffect } from "react";

const UseFetch = (url) => {
  const [datas, setDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortController.signal })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur de chargement des blogs");
          }
          return response.json();
        })
        .then((data) => {
          setDatas(data);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("Fetch aborted");
            return; // Ignore the abort error
          }
          console.error(
            "Erreur lors de la récupération des blogs:",
            error.message
          );
          setError(error.message);
          setIsLoading(false);
        });
    }, 1000); // Simulate a delay of 1 second

    return () => {
      abortController.abort(); // Clean up the fetch request on component unmount
    };
  }, [url]);
  return { datas, isLoading, error };
};

export default UseFetch;
