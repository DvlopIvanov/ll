import React, { useState } from 'react'
import { useFs } from '../context'

const ContextMenu = ({api, Key}) => {
    const deleteFile = () => {
        api({type: 'delete', Key})
    }
    return <ul role="menu">
        <li onClick={deleteFile}>Delete</li>
    </ul>
}

const File = ({name, api}) => {
    const { directory } = useFs()
    const [contextMenu, setContextMenu] = useState(false)
    const matchExtension = name.match(/\.(.+)$/) 
    const extension = matchExtension ? matchExtension[1] : ''
    const Key = `${directory}/${name}`.replace(/^\/+/, '')

    const onClick = e => e.detail == 2 && api({type: 'get', Key })
    const onContextMenu = e => {
        e.preventDefault()
        setContextMenu(!contextMenu)
    }

    return <div className="file" onContextMenu={onContextMenu} onClick={onClick}>
        <span className="file-icon" data-type={extension}></span>
        {name}
        {contextMenu && <ContextMenu Key={Key} api={api}/>}
    </div>
}

export default File