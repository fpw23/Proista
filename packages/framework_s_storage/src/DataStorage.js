import { Database } from 'arangojs'
import { MessageBuilder } from '@proista/server-core/lib/FunctionResult'
import _ from 'lodash'

export class DataStorage {
  constructor (config) {
    this.Config = config
    this.Conn = null
  }

  Connection (config) {
    if (config instanceof Database) {
      return config
    }
    if (this.Conn instanceof Database) {
      return this.Conn
    }
    const lconfig = config || this.Config

    this.Conn = new Database(`http://${lconfig.dbhost}:${lconfig.dbport}`)
    this.Conn.useBasicAuth(lconfig.dbuser, lconfig.dbpassword)
    this.Conn.useDatabase(lconfig.dbname)
    return this.Conn
  }

  GetConfig () {
    return _.clone(this.Config)
  }

  BuildConnection ({ dbhost, dbport, dbuser, dbpassword, dbname }) {
    const ret = new Database(`http://${dbhost}:${dbport}`)
    ret.useBasicAuth(dbuser, dbpassword)
    ret.useDatabase(dbname)
    return ret
  }

  async QueryNoReturn (query, args, config) {
    const conn = this.Connection(config)

    if (args) {
      if (_.isArray(args)) {
        await conn.query({ query: query, bindVars: _.merge({}, ...args) })
      } else {
        await conn.query({ query: query, bindVars: args })
      }
    } else {
      await conn.query(query)
    }
  }

  async QueryFirst (query, args, config) {
    const conn = this.Connection(config)

    if (args) {
      if (_.isArray(args)) {
        const cursor = await conn.query({ query: query, bindVars: _.merge({}, ...args) })
        return cursor.next()
      } else {
        const cursor = await conn.query({ query: query, bindVars: args })
        return cursor.next()
      }
    } else {
      const cursor = await conn.query(query)
      return cursor.next()
    }
  }

  async QueryAll (query, args, config) {
    const conn = this.Connection(config)

    if (args) {
      if (_.isArray(args)) {
        const cursor = await conn.query({ query: query, bindVars: _.merge({}, ...args) })
        return cursor.all()
      } else {
        const cursor = await conn.query({ query: query, bindVars: args })
        return cursor.all()
      }
    } else {
      const cursor = await conn.query(query)
      return cursor.all()
    }
  }

  BuildQueryField (name, value, operator, parameterName, group) {
    return {
      Name: name,
      Value: value,
      Operator: operator || 'EQUALS',
      Group: group || 'AND',
      ParameterName: parameterName
    }
  }

  BuildQueryLimitClause (limit, skip) {
    const Limit = _.isInteger(limit) ? limit : 25
    const Skip = _.isInteger(skip) ? skip : 0
    if (Skip === 0) {
      return `LIMIT ${Limit}`
    } else {
      return `LIMIT ${Skip * Limit}, ${Limit}`
    }
  }

  BuildQuerySortClause (identifier, field, desc) {
    if (!field) {
      return ''
    }

    if (_.includes(field, ':') === false) {
      return `SORT ${identifier}.${field}`
    }

    const fieldParts = _.split(field, ';')
    const fieldStatements = _.map(fieldParts, (fp) => {
      if (_.includes(fp, ':')) {
        const fpParts = _.split(fp, ':')
        return `${identifier}.${fpParts[0]} ${fpParts[1]}`
      } else {
        return fp
      }
    })
    return `SORT ${_.join(fieldStatements, ',')}`
  }

  BuildQueryFilterClause (identifier, fieldList, bodyOnly = false) {
    if (!_.isArray(fieldList)) {
      throw MessageBuilder.Error('field list must be an array')
    }
    if (_.isEmpty(fieldList)) {
      return {
        Text: '',
        Params: {}
      }
    }
    try {
      const filterGroups = new Map()
      filterGroups.set('OR', [])
      filterGroups.set('MUST', [])
      filterGroups.set('AND', [])
      const queryData = {}
      let paramPostNumber = 1
      for (var f of fieldList) {
        if (f.Value === f.DefaultValue) {
          // don't render if default value
          return
        }

        let paramName = f.ParameterName || f.Name

        if (_.has(queryData, paramName)) {
          paramName = `${paramName}${paramPostNumber}`
          paramPostNumber++
        }
        const valueIsString = _.isString(f.Value)
        queryData[paramName] = valueIsString ? _.toLower(f.Value) : f.Value
        const leftSideString = `LOWER(${identifier}.${f.Name})`
        const leftSideRaw = `${identifier}.${f.Name}`
        let currentFilter = null
        switch (f.Group) {
          case 'AND':
            currentFilter = filterGroups.get('AND')
            break
          case 'OR':
            currentFilter = filterGroups.get('OR')
            break
          case 'MUST':
            currentFilter = filterGroups.get('MUST')
            break
          default:
            if (filterGroups.has(f.Group) === false) {
              filterGroups.set(f.Group, [])
            }
            currentFilter = filterGroups.get(f.Group)
            break
        }
        switch (f.Operator) {
          case 'EQUALS':
            currentFilter.push(`${valueIsString ? leftSideString : leftSideRaw} == @${paramName}`)
            break
          case 'NOTEQUALS':
            currentFilter.push(`${valueIsString ? leftSideString : leftSideRaw} != @${paramName}`)
            break
          case 'LESSTHAN':
            currentFilter.push(`${leftSideRaw} < @${paramName}`)
            break
          case 'LESSTHANEQUAL':
            currentFilter.push(`${leftSideRaw} <= @${paramName}`)
            break
          case 'GREATERTHAN':
            currentFilter.push(`${leftSideRaw} > @${paramName}`)
            break
          case 'GREATERTHANEQUAL':
            currentFilter.push(`${leftSideRaw} >= @${paramName}`)
            break
          case 'IN':
            currentFilter.push(`${valueIsString ? leftSideString : leftSideRaw} IN @${paramName}`)
            queryData[paramName] = _.map(f.Value, (v) => { return _.toLower(v) })
            break
          case 'NOTIN':
            currentFilter.push(`${valueIsString ? leftSideString : leftSideRaw} NOT IN @${paramName}`)
            queryData[paramName] = _.map(f.Value, (v) => { return _.toLower(v) })
            break
          case 'CONTAINS':
            currentFilter.push(`${valueIsString ? leftSideString : leftSideRaw} LIKE @${paramName}`)
            queryData[paramName] = `%${_.toLower(f.Value)}%`
            break
          case 'STARTSWITH':
            currentFilter.push(`${leftSideString} LIKE @${paramName}`)
            queryData[paramName] = `${_.toLower(f.Value)}%`
            break
          case 'ENDSWITH':
            currentFilter.push(`${leftSideString} LIKE @${paramName}`)
            queryData[paramName] = `%${_.toLower(f.Value)}`
            break
          case 'MATCHES':
            currentFilter.push(`${identifier}.${f.Name} =~ @${paramName}`)
            break
          case 'NOTMATCHES':
            currentFilter.push(`${identifier}.${f.Name} !~ @${paramName}`)
            break
          case 'ANYIN':
            currentFilter.push(`${identifier}.${f.Name} ANY IN @${paramName}`)
            queryData[paramName] = _.map(f.Value, (v) => { return _.toLower(v) })
            break
        }
      }

      const filterText = []
      const groupKeys = filterGroups.keys()

      for (var groupKey of groupKeys) {
        const keyParts = _.split(groupKey, '_')
        const keyOperator = keyParts[0]
        const groupFilter = filterGroups.get(groupKey) || []

        if (groupFilter.length > 0) {
          if (keyOperator === 'OR') {
            filterText.push(' (' + _.join(groupFilter, ' || ') + ') ')
          } else if (keyOperator === 'AND') {
            filterText.push(' (' + _.join(groupFilter, ' && ') + ') ')
          } else {
            throw Error('Invalid Query Group Key Operator!')
          }
        }
      }

      const ret = {
        Text: '',
        Params: queryData
      }

      if (filterText.length > 0) {
        if (bodyOnly) {
          ret.Text = '&& ' + _.join(filterText, ' && ') + ' '
        } else {
          ret.Text = 'Filter ' + _.join(filterText, ' && ') + ' '
        }
      }

      return ret
    } catch (err) {
      throw MessageBuilder.Error(err.message)
    }
  }

  async Reset (config) {
    try {
      const conn = this.Connection(config)
      const collections = await conn.listCollections()

      _.forEach(collections, async (c) => {
        const collection = conn.collection(c.name)
        await collection.drop()
      })

      // await conn.truncate()
    } catch (err) {
      throw MessageBuilder.Error(`Reset Database command failed with error: ${err.Message || err.message}`)
    }
  }

  async CreateDatabase (dbName, dbUser = 'root', dbPassword = '@Test24', config) {
    try {
      const conn = this.Connection(config)
      const names = await conn.listDatabases()

      if (_.indexOf(names, dbName) === -1) {
        await conn.createDatabase(dbName, [{ username: 'root', passwd: dbPassword, active: true, extra: { grant: 'rw' } }])
      }
    } catch (err) {
      throw MessageBuilder.Error(`Create Database '${dbName}' command failed with error: ${err.Message || err.message}`)
    }
  }

  async CreateCollection (colName, config) {
    try {
      const conn = this.Connection(config)
      const collection = conn.collection(colName)
      await collection.create()
    } catch (err) {
      if (err.message !== 'duplicate name') {
        throw MessageBuilder.Error(`Create Collection '${colName}' command failed with error: ${err.Message || err.message}`)
      }
    }
  }

  async CreateCollectionIndex (colName, fields, options, config) {
    try {
      const conn = this.Connection(config)
      const collection = conn.collection(colName)
      const results = await collection.createHashIndex(fields, options)

      if (results.errors > 0) {
        const messages = _.join(results.details, '; ')
        throw MessageBuilder.Error(`Create Collection index '${colName}' command failed with error: ${messages}`)
      }
    } catch (err) {
      throw MessageBuilder.Error(`Create Collection index '${colName}' command failed with error: ${err.Message || err.message}`)
    }
  }

  async CreateEdgeCollection (colName, config) {
    try {
      const conn = this.Connection(config)
      const collection = conn.edgeCollection(colName)
      await collection.create()
    } catch (err) {
      if (err.message !== 'duplicate name') {
        throw MessageBuilder.Error(`Create Edge Collection '${colName}' command failed with error: ${err.Message || err.message}`)
      }
    }
  }

  async AddToCollection (colName, values, forceReplace = false, config) {
    try {
      const conn = this.Connection(config)
      let data = []

      if (_.isArray(values)) {
        data = _.concat(values)
      } else {
        data.push(values)
      }

      const collection = conn.collection(colName)

      const info = await collection.count()

      if (forceReplace === true && info.count > 0) {
        await collection.truncate()
      }

      const results = await collection.import(data, { details: true })

      if (results.errors > 0) {
        const messages = _.join(results.details, '; ')
        throw MessageBuilder.Error(`Add To Collection '${colName}' command failed with error: ${messages}`)
      }
    } catch (err) {
      throw MessageBuilder.Error(`Add To Collection '${colName}' command failed with error: ${err.Message || err.message}`)
    }
  }

  async AddToEdgeCollection (colName, values, forceReplace = false, config) {
    try {
      const conn = this.Connection(config)
      let data = []

      if (_.isArray(values)) {
        data = _.concat(values)
      } else {
        data.push(values)
      }

      const collection = conn.edgeCollection(colName)

      const info = await collection.count()

      if (forceReplace === true && info.count > 0) {
        await collection.truncate()
      }

      const results = await collection.import(data, { details: true })

      if (results.errors > 0) {
        const messages = _.join(results.details, '; ')
        throw MessageBuilder.Error(`Add To Edge Collection '${colName}' command failed with error: ${messages}`)
      }
    } catch (err) {
      throw MessageBuilder.Error(`Add To Edge Collection '${colName}' command failed with error: ${err.Message || err.message}`)
    }
  }

  async GetDocument (colName, key, opts, config) {
    try {
      const conn = this.Connection(config)

      const collection = conn.collection(colName)
      const fopts = _.merge({ graceful: true }, opts)
      const doc = await collection.document(key, fopts)
      return doc
    } catch (err) {
      throw MessageBuilder.Error(`Get Document in Collection '${colName}' command failed with error: ${err.Message || err.message}`)
    }
  }

  async AddDocument (colName, document, opts, config) {
    try {
      const conn = this.Connection(config)
      let newDocument = document
      if (_.isArray(document)) {
        newDocument = _.merge({}, ...document)
      }

      const collection = conn.collection(colName)
      const fopts = _.merge({ waitForSync: true, returnNew: true }, opts)
      const doc = await collection.save(newDocument, fopts)
      return doc.new
    } catch (err) {
      throw MessageBuilder.Error(`Get Document in Collection '${colName}' command failed with error: ${err.Message || err.message}`)
    }
  }

  async UpdateDocument (colName, document, opts, config) {
    try {
      const conn = this.Connection(config)

      const collection = conn.collection(colName)
      const fopts = _.merge({ waitForSync: true, returnNew: true }, opts)
      const results = await collection.update(document._key, document, fopts)

      if (results.errors > 0) {
        const messages = _.join(results.details, '; ')
        throw MessageBuilder.Error(`Update document in Collection '${colName}' command failed with error: ${messages}`)
      }
      return results.new
    } catch (err) {
      throw MessageBuilder.Error(`Update Document in Collection '${colName}' command failed with error: ${err.Message || err.message}`)
    }
  }
}
