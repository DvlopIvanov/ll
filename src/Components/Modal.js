import React, { useState, useRef } from "react"
import { actions, useFs } from '../context'


const ModalConfig = () => {
    const inputs = ['Bucket', 'region', 'accessKeyId', 'secretAccessKey']
    const onChange = ({ target: {name, value} }) => localStorage[name] = value
    return <>
        <h3>Configuration </h3>
        <p>Before using the filesystem you need to input your credentials!</p>
        <br/>
        <div className="config">
          {inputs.map(inp => (
            <label htmlFor={inp} key={inp}>
                {inp}
              <input type="text" onChange={onChange} name={inp} id={inp}/>
            </label>
          ))
          }
        </div>
        <br/>
        <button onClick={()=> actions.setModal('')}>Start!</button>
    </>
}
const ModalUpload = ({api}) => {
  const [path, setPath] = useState('')
  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const onFileChange = ()=>{
    const file = fileRef.current.files[0]
    const reader = new FileReader()
    reader.onload = function (e) {
      console.log('loaded')
      const binary = e.target.result
      const base64 = window.btoa(binary)
      const blob = window.atob(base64)
      setFile(blob)
    }
    reader.readAsBinaryString(file)
  }
  const handleUpload = () => {
    file && path && api({type: 'put', Key: path, Body: file})
  }
  return <>
    <h3>Upload a file</h3>
    <input type="text" placeholder="Example: abc/dfg/hijk.txt" value={path} onChange={({target: {value}}) => setPath(value)}/>
    <div className="actions">
      <button onClick={() => fileRef.current.click()}>Choose file<input ref={fileRef} onChange={onFileChange} type='file' /></button>
      <button disabled={!file || !path} onClick={handleUpload}>Upload</button>
    </div>
  </>
}
const ModalContents = ({Key, contents}) => (
  <>
    <h3>{Key}</h3>
    <p>{contents}</p>
  </>
)
const Modals = {
  ModalConfig,
  ModalContents,
  ModalUpload
}

const Modal = ({api}) => {
  const { modal } = useFs()
  const {name, ...rest} = modal
  const MappedModal = Modals[name]
  console.log('rest', rest)
  return <div className="modal">
    <span className="close" onClick={() => actions.setModal('')}>x</span>
    {<MappedModal {...{api, ...rest}}/>}
  </div>
}

export default Modal