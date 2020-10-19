import _ from 'lodash'

export function not (a, b, valueProp) {
  return _.filter(a, (aValue) => { return _.find(b, (bValue) => { return aValue[valueProp] === bValue[valueProp] }) === undefined })
}

export function intersection (a, b, valueProp) {
  return _.filter(a, (aValue) => { return _.find(b, (bValue) => { return aValue[valueProp] === bValue[valueProp] }) !== undefined })
}

export function union (a, b, valueProp) {
  return [...a, ...not(b, a, valueProp)]
}
