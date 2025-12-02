import React from 'react'
import '../styles/ErrorMessage.css'

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <span className="error-icon">⚠️</span>
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage
