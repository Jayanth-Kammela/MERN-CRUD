import React, { useState } from 'react'

const GetToken = () => {
    // const token=localStorage.getItem('token')
    const[forToken,setForToken]=useState(()=>{
        return localStorage.getItem('token')
    })
    const forTokenFun=(data)=>{
        localStorage.setItem('token',data)
        setForToken(data)
    }
    return [forToken,forTokenFun]
}

export default GetToken