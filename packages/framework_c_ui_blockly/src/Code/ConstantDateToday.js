import Blockly from 'blockly'
import { Colors } from './Colors'

export const ConstantDateToday = {
  Name: 'constant_date_today',
  Def: {
    type: 'constant_date_today',
    message0: 'Date Today',
    output: 'type_date',
    colour: Colors.Constants,
    tooltip: 'Todays Date',
    helpUrl: ''
  },
  Code: function (block) {
    var code = 'moment()'
    return [code, Blockly.JavaScript.ORDER_NONE]
  }
}
