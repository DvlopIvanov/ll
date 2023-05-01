import { set, get } from 'lodash'

const getCredentials = () => {
    const {secretAccessKey = '', region = 'eu-central-1', accessKeyId='', Bucket} = localStorage

    if(accessKeyId.length < 20 || secretAccessKey.length < 40 || !Bucket.match(/.+-.+/)){
        return null
    }
    return {secretAccessKey, region, accessKeyId, Bucket}
}

const createTree = entities => {
    return entities.reduce( (acc, e) =>{
        const [,directories, file] = e.Key.match(/(.+\/)?(.+)/)
        const dirs = directories && directories.split("/").join('.').slice(0, -1)
        if(dirs){
            !get(acc, dirs) && set(acc, dirs, {files:[]})
            if(file){
                const prevFiles = get(acc,dirs).files || []
                get(acc,dirs).files = [...prevFiles, file]
            }
        }
        !dirs && file && acc.files.push(file)
        return acc
    },
    {
        files: [],
    })

}

export {getCredentials, createTree}