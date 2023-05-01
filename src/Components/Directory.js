import React, { useState } from "react"
import { get } from 'lodash'
import { actions, useFs } from '../context'

const Directory = ({tree, name, path}) => {
    const { directory } = useFs()
    const pathWithSlash = path.replace(/\./g,'/') 
    const [expanded, expand] = useState(false)
    const active = directory === pathWithSlash ? ' active' : ''
    const handleDir = ({detail}) => {
        detail == 1 && expand(!expanded)
        detail == 2 && actions.setDirectory(pathWithSlash)
    }

    const subdirs = Object.keys(get(tree,path) || {})
    .filter(e=> e != 'files')
    .map(name => <Directory name={name} key={name} path={[path,name].join('.')} tree={tree} />)
    return (<div className={`directory${active}`}>
        <div onClick={handleDir}>
            <span className="folder"></span>{name}
        </div>
        {subdirs && <div className={`subdir${expanded ? ' expanded' : '' }`}>{subdirs}</div> }
    </div>)

}

export default Directory