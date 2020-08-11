import Blockly from 'blockly'
import { Colors } from './Colors'
import _ from 'lodash'

export const ConstantText = {
  Name: 'constant_text',
  Def: {
    type: 'constant_text',
    message0: 'Text %1',
    args0: [
      {
        type: 'field_input',
        name: 'Value',
        value: ''
      }
    ],
    output: 'type_text',
    colour: Colors.Constants,
    tooltip: 'Any Text',
    helpUrl: ''
  },
  Code: function (block) {
    var val = block.getFieldValue('Value')
    var code = `'${_.replace(val, /'/g, '\\\'')}'`
    return [code, Blockly.JavaScript.ORDER_NONE]
  }
}
