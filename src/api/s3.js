import { S3Client, ListObjectsCommand, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"

const exposeApi = (config, setContents, actions) => {
  if(!config) return
  const {Bucket, region, accessKeyId, secretAccessKey} = config
  const client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
  })

  const api = async ({type, Key, Body = ''}) => {
    try {
      let res
      switch(type){
        case 'list': 
          res = await client.send(new ListObjectsCommand({Bucket}))
          setContents(res.Contents || [])
          // console.log('RESPONSE', res)
          break;
        case 'put':
          res = await client.send(new PutObjectCommand({
            Key,
            Bucket,
            Body,
          }))
          api({type: 'list'})
          console.log(res)
        break;
        case 'delete':
          res = await client.send(new DeleteObjectCommand({
            Key,
            Bucket
          }))
          api({type: 'list'})
        break;
        case 'get':
          res = await client.send(new GetObjectCommand({
            Bucket,
            Key
          }))
          if(res.$metadata.httpStatusCode == 200){
            res.Body.transformToString().then(str => {
              actions.setModal({name: 'ModalContents', Key, contents: str})
            })
          }
      }
    } catch(e) {
      console.log('error',e)
    }
  }
  return api
}



export default exposeApi