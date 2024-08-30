import React, { useContext } from 'react'
import useStateContext, { stateContext } from '../Hooks/useStateContext'

export default function Question() {
    const { context, setContext }= useStateContext

    console.log(context);
    
  return (
    <div>Question</div>
  )
}
