import React, { useState } from 'react'
import "./search.css"

function Search({handleClick,handleSelect,handleInput, query, select}) {
    

    return (
        <div className="search">
            <input type="text" value={query} onChange={(e) => handleInput(e)} placeholder="Type something" />
            <select name="" id="" value={select} onChange={(e) => handleSelect(e)}>
                <option value="0">Choose</option>
                <option value="football">football</option>
                <option value="basketball">basketball</option>
                <option value="car">car</option>
            </select>
            <button onClick={handleClick}>SEARCH</button>
        </div>
    )
}

export default Search
