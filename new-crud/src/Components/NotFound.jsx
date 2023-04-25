import React from 'react'


const NewApp = ({ children }) => {
  return (
    <>
      <h1>NewApp</h1>
      {children}
      <h1>NewApp</h1>
    </>)
}
const NotFound = () => {
  return (
    <div>
      NotFound
      <NewApp><h1>In App</h1></NewApp>
    </div>
  )
}

export default NotFound
