import { Colors } from './Colors'
import Blockly from 'blockly'

export const ConstantComma = {
  Name: 'constant_comma',
  Def: {
    message0: 'Comma',
    output: 'type_comma',
    colour: Colors.Constants,
    tooltip: 'Comma',
    helpUrl: ''
  },
  Code: function (block) {
    return [',', Blockly.JavaScript.ORDER_COMMA]
  }
}
