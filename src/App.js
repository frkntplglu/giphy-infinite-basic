import {useState, useEffect} from "react";
import './App.css';
import ImageList from './components/ImageList';
import Search from './components/Search';
import axios from "axios";

function App() {
  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);

  const [query, setQuery] = useState("");
    const [select, setSelect] = useState(0);

    const handleInput = e => {
        setSelect(0);
        setQuery(e.target.value);
    }

    const handleSelect = e => {
        setQuery("");
        setSelect(e.target.value);
    }

    const handleClick = () => {
        if(query.length > 0 && query.length < 3){
            alert("Query cannot be smaller than 3 characters");
            return;
        }

        handleFetch(query, select, 0);
    }
  
  const handleFetch = (query,select, offset = 0) => {
    let actualQuery = "";

    if(select === 0){
      actualQuery = query;
    }else{
      actualQuery = select;
    }
    const url = `https://api.giphy.com/v1/gifs/search?api_key=f4nA7EJOnybwdpv9cnTsCG10bpEKm54g&q=${actualQuery}&limit=25&offset=${offset}&rating=g&lang=en`
    axios.get(url)
    .then((response) => {
      console.log("images", images);
      setImages(images => [...new Map([...images, ...response.data.data].map(image => [image["id"], image])).values()]);
    }).catch(error => {
      console.log(error)
    })
    
  }

  const infiniteScroll = () => {
    if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
      setOffset(prevOffset => prevOffset + 25);
      handleFetch(query, select, offset)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);

    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    }
  })

  return (
    <div className="App">
      <Search
       handleInput={handleInput}
       handleSelect={handleSelect}
       handleClick={handleClick}
       query={query}
       select={select} />
      {images.length > 0 ? <ImageList images={images} /> : null}
    </div>
  );
}

export default App;
