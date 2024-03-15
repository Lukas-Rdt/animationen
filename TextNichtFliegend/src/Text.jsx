/* eslint-disable react/prop-types */
// import React from 'react'

export function Text({ text }) {

  return (
    <div
      style={{
        fontSize: '20px',
        textAlign: 'center',
        border: '1px solid black',
      }}
    >
        {text}
    </div>
  )
}
