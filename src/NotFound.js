import React from 'react';
import Found from './404.png'

const NotFound = (props) => {
  return (
    <div className="App-Missing">
      <img src={Found} alt="404" />
    </div>
  )
}

export default NotFound;