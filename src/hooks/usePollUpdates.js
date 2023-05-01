import { useEffect } from 'react'
const usePollUpdates = api => {
    useEffect(()=>{
        if(!api) return
        const pollUpdatesId = setInterval(()=>{
            api({type: 'list'})
        }, 20000)
        return ()=> clearInterval(pollUpdatesId)
    }, [api])
}

export default usePollUpdates