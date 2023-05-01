import React from "react"
import { useFs, actions } from "../context"

const Back = () => {
  const { directory } = useFs()
  const handleBack = () => {
    const backDirectory = directory.split('/').slice(0,-1)
    actions.setDirectory(
      backDirectory.length 
      ? backDirectory.join('/')
      : '/'
    )
  }
  return <>
    {directory != '/' && <span className="back" onClick={handleBack}>&#x2190;</span>}
  </>
}

export default Back