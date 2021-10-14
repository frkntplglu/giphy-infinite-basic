import React from 'react'
import "./imagelist.css"
import Image from '../Image'

function ImageList({images}) {
    return (
        <div className="image-list">
            {images.map(image => <Image key={image.id} image={image} />)}
        </div>
    )
}

export default ImageList
