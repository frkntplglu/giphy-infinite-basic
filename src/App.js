import {useState, useEffect, useRef, useCallback} from "react";
import './App.css';
import ImageList from './components/ImageList';
import Search from './components/Search';
import useFetch from "./hooks/useFetch";


function App() {

  const [offset, setOffset] = useState(-25);

  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
    const [select, setSelect] = useState(0);

    const { list } = useFetch(query, offset);

    const loadRef = useRef();

    const handleInput = e => {
        setSelect(0);
        setInput(e.target.value);
    }

    const handleSelect = e => {
        setInput("");
        setSelect(e.target.value);
    }

    const handleClick = () => {
        if(input.length > 0 && input.length < 3){
            alert("Query cannot be smaller than 3 characters");
            return;
        }

        if(select === 0){
          setQuery(input);
        }else{
          setQuery(select);
        }
    }
  
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting ) {
      setOffset((prev) => prev + 25);
    }
  }, []);


  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loadRef.current) observer.observe(loadRef.current);
    return () => {
      observer.disconnect();
    }

    
  },[handleObserver])
  return (
    <div className="App">
      <Search
       handleInput={handleInput}
       handleSelect={handleSelect}
       handleClick={handleClick}
       input={input}
       select={select} />
       {
         list.length > 0 ? <ImageList images={list} /> : null
       }
      <div ref={loadRef}></div>
    </div>
  );
}

export default App;
