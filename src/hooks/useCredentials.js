import { useEffect } from "react"
import { getCredentials } from "./utils"
import { actions } from "../context"

const useCredentials = () => {
  const credentials = getCredentials()
  
  useEffect(()=>{
    !credentials && actions.setModal({name: 'ModalConfig'})
  }, [credentials])

  return credentials
}
export default useCredentials