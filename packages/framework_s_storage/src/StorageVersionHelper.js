import { promises as fs } from 'fs'
import _ from 'lodash'
import path from 'path'

export const getVersions = async (versionsFolder) => {
  const versionDirItems = await fs.readdir(versionsFolder, { withFileTypes: true })
  return _.map(_.filter(versionDirItems, (di) => { return di.isDirectory() }), (d) => {
    return d.name
  })
}

export const getVersionScripts = async (versionScriptFolder) => {
  const versionScriptDirItems = await fs.readdir(versionScriptFolder, { withFileTypes: true })
  const ret = []
  _.each(_.filter(versionScriptDirItems, (di) => { return di.isFile() }), (d) => {
    if (_.endsWith(d.name, '.js') === true) {
      const script = require(path.join(versionScriptFolder, d.name))
      ret.push({
        name: d.name,
        script: script.default
      })
    }
  })
  return ret
}
