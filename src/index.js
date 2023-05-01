import React, { useState, StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/styles.sass'

import ContextProvider, { useFs, actions } from './context'
import usePollUpdates from './hooks/usePollUpdates'
import useCredentials from './hooks/useCredentials'
import exposeApi from './api/s3'
import { createTree } from './hooks/utils'
import { get } from 'lodash'

import Navigation from './Components/Nav'
import Modal from './Components/Modal'
import File from './Components/File'
import Directory from './Components/Directory'
import Back from './Components/Back'

const App = () => {
    const { directory, modal } = useFs()
    const [entities, setContents] = useState([])
    const credentials = useCredentials(actions.setModal)
    const api = exposeApi(credentials, setContents, actions)
    // Initial fetch
    useEffect(()=> {
       api && api({type: 'list'})
    },[])
    // Polling updates
    usePollUpdates(api)
    const tree = entities.length && createTree(entities)
    const handleEntities = () => {
        if(!tree) return
        const path = directory == '/' ? '' : directory.replace(/\//g, '.')
        const directories = directory == '/' ? tree : get(tree, path, tree)
        return [
            ...(Object.keys(directories)
                .filter(e => e != 'files')
                .map(d => <Directory name={d} tree={tree} path={`${path}/${d}`} key={d}/>)),
            ...get(tree, path, tree).files
                ?.map(f => <File name={f} api={api} key={f} />),
        ]
    }
    const files = handleEntities() || []

    return <StrictMode>
        <Navigation tree={tree} />
        <main>
            <span className="path">
                <Back/>
                {directory}
            </span>
            <div className="entities">
                {files.length ? files : 'No files in current directory'}
            </div>
            <div className="actions">
                <button onClick={() => actions.setModal({name: 'ModalUpload'})}>Upload</button>
                <button onClick={() => actions.setModal({name: 'ModalConfig'})}>Config</button>
            </div>
        </main>
        {modal.name && <Modal {...{api}}/>}
    </StrictMode>
}

const MainApp = () => {
    return <ContextProvider>
        <App/>
    </ContextProvider>
}
createRoot(document.getElementById('root')).render(<MainApp/>)