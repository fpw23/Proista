import Blockly from 'blockly'
import { Colors } from './Colors'

export const ConstantNumber = {
  Name: 'constant_number',
  Def: {
    type: 'constant_number',
    message0: 'Number %1',
    args0: [
      {
        type: 'field_number',
        name: 'Value',
        value: 0
      }
    ],
    output: 'type_number',
    colour: Colors.Constants,
    tooltip: 'Any Valid Number',
    helpUrl: ''
  },
  Code: function (block) {
    var val = block.getFieldValue('Value')
    var code = `${val}`
    return [code, Blockly.JavaScript.ORDER_NONE]
  }
}
