/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

export default function Title(props) {
  return (
    <div style={{
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        border: '1px solid black',
    }}>
        {props.titleText}
    </div>
  )
}
