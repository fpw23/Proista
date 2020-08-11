import fs from 'fs'
import path from 'path'
import _ from 'lodash'

export const EndPointStatic = (rootRoute, folder) => {
  const ret = {
    name: rootRoute,
    routes: []
  }

  const controllerFiles = fs.readdirSync(folder, { withFileTypes: true })
    .filter(dirent => dirent.isFile)
    .map(dirent => dirent.name)
  _.each(controllerFiles, (cf) => {
    if (_.endsWith(cf, '.js') === true) {
      const controllerFile = path.join(folder, cf)
      if (fs.existsSync(controllerFile)) {
        const controller = require(controllerFile)
        if (controller) {
          ret.routes.push(controller.default)
        }
      }
    }
  })
  return ret
}
