import React, { useReducer, createContext, useContext } from "react"
const initialState = {
    credentials: {},
    directory: '/',
    entities: [],
    modal: {
        name: '',
    },
}

const reducer = function(fs, action) {
    switch(action.type){
        case  'SET_CREDENTIALS':
            return {...fs, credentials: action.credentials}
        case 'SET_MODAL':
            return {...fs, modal: action.modal}
        case 'SET_DIRECTORY': 
            return {...fs, directory: action.directory}
        case 'SET_ENTITIES':
            return {...fs, entities: action.entities}
        case 'SET_PATH':
            return {...fs, path: action.path}
        default:
            console.warn('Unknown action', action)
            return {...fs}
    }
}

let contextDispatch
const FileSystemContext = createContext(null)
const ContextProvider = ({children}) => {
    const [fs, dispatch] = useReducer(reducer, initialState)
    contextDispatch = dispatch
    return <FileSystemContext.Provider value={{dispatch, ...fs}}>
        {children}
    </FileSystemContext.Provider>
}
const useFs = () => useContext(FileSystemContext)
const useFsDispatch = () => useContext(FileSystemContext).dispatch

const actions = (() => {
    return {
        setCredentials: credentials => contextDispatch({type: 'SET_CREDENTIALS', credentials}),
        setModal: modal => contextDispatch({type: 'SET_MODAL', modal}),
        setDirectory: directory => contextDispatch({type: 'SET_DIRECTORY', directory}),
        setEntities: entities => contextDispatch({type: 'SET_ENTITIES', entities}),
    }
})()

export {
    ContextProvider as default,
    FileSystemContext,
    useFs,
    useFsDispatch,
    actions
}