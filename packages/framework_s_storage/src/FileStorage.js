import _ from 'lodash'
import { FunctionResultMessage } from '@proista/server-core/lib/FunctionResult'
const Minio = require('minio')

export class FileStorage {
  constructor (config) {
    this.Config = config
    this.Client = null
  }

  GetConnection (config) {
    if (config instanceof Minio.Client) {
      return config
    }

    if (this.Client instanceof Minio.Client) {
      return this.Client
    }

    this.Client = new Minio.Client({
      endPoint: config.endPoint,
      port: parseInt(config.port),
      useSSL: config.secure,
      accessKey: config.accessKey,
      secretKey: config.secretKey
    })

    return this.Client
  }

  async Save (bucket, path, name, data, config) {
    try {
      const client = this.GetConnection(config || this.Config)
      const bucketReady = await client.bucketExists(bucket)
      if (bucketReady !== true) {
        await client.makeBucket(bucket, '')
      }
      const file = `${path}/${name}`
      const etag = await client.putObject(bucket, file, data, data.length)
      return etag
    } catch (err) {
      throw new FunctionResultMessage(err.message)
    }
  }

  async Get (bucket, path, name, config) {
    try {
      const client = this.GetConnection(config || this.Config)
      const file = `${path}/${name}`
      const data = await client.getObject(bucket, file)
      return data
    } catch (err) {
      throw new FunctionResultMessage(err.message)
    }
  }

  async Remove (bucket, path, name, config) {
    try {
      const client = this.GetConnection(config || this.Config)
      const file = `${path}/${name}`
      await client.removeObject(bucket, file)
    } catch (err) {
      throw new FunctionResultMessage(err.message)
    }
  }

  List (bucket, pattern = '', recursive = true, config) {
    return new Promise((resolve, reject) => {
      try {
        const files = []
        const client = this.GetConnection(config || this.Config)
        const fileStream = client.listObjects(bucket, '', true)

        fileStream.on('data', function (file) {
          files.push(file)
        })
        fileStream.on('end', function () {
          resolve(files)
        })
        fileStream.on('error', function (err) {
          reject(new FunctionResultMessage(err.message))
        })
      } catch (err) {
        reject(new FunctionResultMessage(err.message))
      }
    })
  }

  async Reset (config) {
    try {
      const client = this.GetConnection(config || this.Config)
      const buckets = await client.listBuckets()

      let i = 0
      for (i === 0; i < buckets.length; i++) {
        const files = await this.List(buckets[i].name, '', true)
        const fileNames = _.map(files, (f) => { return f.name })
        await client.removeObjects(buckets[i].name, fileNames)
        await client.removeBucket(buckets[i].name)
      }
    } catch (err) {
      throw new FunctionResultMessage(err.message)
    }
  }
}

export default FileStorage
