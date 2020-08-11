import Blockly from 'blockly'
import { getConnectionTypesFromInput } from '../../Shared'
import _ from 'lodash'

export const BuildSchemaTestReturn = (block, returnCode) => {
  const nextTestInput = block.getInput('nextTest')
  const nextTestInputTypes = getConnectionTypesFromInput(nextTestInput)
  const nextTestIsComma = _.indexOf(nextTestInputTypes, 'type_comma') !== -1
  const nextTest = Blockly.JavaScript.valueToCode(block, 'nextTest', Blockly.JavaScript.ORDER_NONE)
  if (nextTest) {
    if (nextTestIsComma === true) {
      return [`${returnCode}${nextTest}`, Blockly.JavaScript.ORDER_MEMBER]
    } else {
      return [`${returnCode}.${nextTest}`, Blockly.JavaScript.ORDER_MEMBER]
    }
  } else {
    return [returnCode, Blockly.JavaScript.ORDER_MEMBER]
  }
}
