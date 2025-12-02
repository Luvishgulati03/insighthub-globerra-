import React from 'react'
import '../styles/HelloWorld.css'

const HelloWorld = () => {
  return (
    <div className="hello-world-container">
      <h1 className="hello-world-title">Hello World</h1>
      <p className="hello-world-subtitle">Welcome to InsightHub Dashboard</p>
      <div className="hello-world-info">
        <p>This is a React application built with Vite</p>
      </div>
    </div>
  )
}

export default HelloWorld
