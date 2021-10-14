import React from 'react'
import "./image.css"

function Image({image}) {
    return (
        <div className="giphy-image">
            <figure><img src={image.images.original.url} alt={image.title} /></figure>
        </div>
    )
}

export default Image
