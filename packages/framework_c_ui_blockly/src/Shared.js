import Blockly from 'blockly'
import _ from 'lodash'

export function AddBlock ({ Name, Def, Code, Mutators, CustomInit, CustomBlockDef }) {
  if (Def) {
    let blockDef = {
      init: function () {
        this.jsonInit(Def)

        if (CustomInit) {
          var thisBlock = this
          CustomInit.call(thisBlock)
        }
      }
    }

    if (CustomBlockDef) {
      blockDef = _.merge({}, blockDef, CustomBlockDef)
    }

    Blockly.Blocks[Name] = blockDef
  }

  if (Code) {
    Blockly.JavaScript[Name] = Code
  }

  if (_.isArray(Mutators)) {
    for (var m of Mutators) {
      const mname = m[0]
      const mdef = m[1]
      if (mdef) {
        try {
          Blockly.Extensions.registerMutator(mname,
            mdef.Mixin,
            mdef.Extension)
        } catch (extensionRegisterError) {

        }
      }
    }
  }
}

const regexMatchParens = /^\((.*)\)$/gm

export const cleanSurroundingParens = (text) => {
  if (text) {
    const match = regexMatchParens.exec(text)
    if (match) {
      return match[1] || text
    } else {
      return text
    }
  } else {
    return text
  }
}

export const getCodeForSingleBlock = (block) => {
  if (!block) {
    return ''
  }
  if (block.disabled) {
    // Skip past this block if it is disabled.
    return getCodeForSingleBlock(block.getNextBlock())
  }

  var func = Blockly.JavaScript[block.type]
  var code = func.call(block, block)
  if (_.isArray(code)) {
    return [...code]
  } else if (code === null) {
    return ''
  } else {
    return code
  }
}

export const getInputConnectionTypes = (block) => {
  const outputConn = block.outputConnection

  if (outputConn) {
    const targetConn = outputConn.targetConnection
    if (targetConn) {
      if (_.isArray(targetConn.check_)) {
        return _.clone(targetConn.check_)
      } else {
        return []
      }
    } else {
      return []
    }
  } else {
    return []
  }
}

export const getConnectionTypesFromInput = (input) => {
  if (input) {
    const conn = input.connection

    if (conn) {
      const targetConn = conn.targetConnection
      if (targetConn) {
        if (_.isArray(targetConn.check_)) {
          return _.clone(targetConn.check_)
        } else {
          return []
        }
      } else {
        return []
      }
    } else {
      return []
    }
  } else {
    return []
  }
}

export const SharedColors = {
  Logic: 230,
  Basic: 80,
  Advance: 315,
  Constants: 170,
  Root: 10
}
