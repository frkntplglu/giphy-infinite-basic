import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(query, offset) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendQuery = useCallback(async () => {
    try {
      
      if(query !== ""){
        setLoading(true);
        setError(false);
        const res = await axios.get(
            `https://api.giphy.com/v1/gifs/search?api_key=f4nA7EJOnybwdpv9cnTsCG10bpEKm54g&q=${query}&limit=25&offset=${offset}&rating=g&lang=en`
          );
          setList(images => [...new Map([...images, ...res.data.data].map(image => [image["id"], image])).values()]);
          setLoading(false);
      }
      
    } catch (err) {
      setError(err);
    }
  }, [query, offset]);

  useEffect(() => {
    sendQuery(query);
  }, [query, sendQuery, offset]);

  return { loading, error, list };
}

export default useFetch;
