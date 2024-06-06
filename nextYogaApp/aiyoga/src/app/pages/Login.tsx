"use client"
import React, { useState } from 'react'

export default function login() {

    const [input, setinput] = useState('')
    const [ response , setResponse] = useState("");

    const handleClick = async()=>{
        const response = await fetch("/api/signup",{
            method:"POST",
            body:JSON.stringify({hello:`${input}`})

        })

        const output = await response.json()
        setResponse(output)
    }

  return (
    <div>
        <input value={input} onChange={(e)=>setinput(e.target.value)}/>
        <button onClick={handleClick}>click me</button>
        <div>outpout hre --=- ${response}</div>
    </div>
  )
}
