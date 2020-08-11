import _ from 'lodash'

export const dataFieldRegEx = /"dataField": "([a-zA-Z/.]*)"/gm

export const buildDataSchemaFromDefinition = (definition = '') => {
  let m = dataFieldRegEx.exec(definition)
  const ret = {}
  while (m) {
    if (m[1]) {
      _.set(ret, m[1], null)
    }
    m = dataFieldRegEx.exec(definition)
  }
  return ret
}

export const optionLookupNameRegEx = /"options": "([a-zA-Z]*)"/gm

export const buildLookupNamesFromDefinition = (definition = '') => {
  let m = optionLookupNameRegEx.exec(definition)
  const ret = []
  while (m) {
    if (m[1]) {
      ret.push(m[1])
    }
    m = optionLookupNameRegEx.exec(definition)
  }
  return _.uniq(ret)
}
