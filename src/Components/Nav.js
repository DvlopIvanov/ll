import React from "react"
import Directory from './Directory'

const Navigation = ({tree = {}}) => {
  const root = Object.keys(tree).filter(k => k != 'files' ).map(name => {
    return <Directory name={name} key={name} path={name} tree={tree} /> 
  })
  return <nav>
    <h3 className="navHead">S3 Browser</h3>
    {root}
  </nav>
}

export default Navigation