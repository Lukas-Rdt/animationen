/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

export function GraphicContainer({ type, src, altText}) {

  return (
    <div style={{ border: '1px solid red' }}>
        {type === 'image' && (
            <img src={src} alt={altText} />
        )}

        {type === 'video' && (
            <video src={src} type='video/mp4'></video>
        )}
    </div>
  )
}
