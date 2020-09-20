const { v4 } = require('uuid')
const shortid = require('shortid')

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')

export const CharacterTypes = {
  AphlaLower: 'AphlaLower',
  AphlaUpper: 'AphlaUpper',
  Numeric: 'Number',
  Mixed: 'Mixed'
}

export const IdHelper = {
  uuId: () => {
    return v4()
  },
  shortId: () => {
    return shortid.generate()
  },
  makeId: (length, type = CharacterTypes.Mixed) => {
    var result = ''
    let characters = ''
    switch (type) {
      case CharacterTypes.AphlaLower:
        characters = 'abcdefghijklmnopqrstuvwxyz'
        break
      case CharacterTypes.AphlaUpper:
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        break
      case CharacterTypes.Numeric:
        characters = '0123456789'
        break
      case CharacterTypes.Mixed:
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        break
    }
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
}

export default IdHelper
