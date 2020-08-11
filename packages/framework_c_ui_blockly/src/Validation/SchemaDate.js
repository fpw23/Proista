import Blockly from 'blockly'
import { Colors } from './Colors'

export const SchemaDate = {
  Name: 'schema_date',
  Def: {
    type: 'schema_date',
    message0: 'Date %1',
    args0: [
      {
        type: 'input_value',
        name: 'nextTest',
        check: ['type_schema_test_any', 'type_schema_test_date']
      }
    ],
    previousStatement: 'type_schema_type',
    nextStatement: 'type_schema_type',
    colour: Colors.SchemaFieldTypeDate,
    tooltip: 'Date (must be date)',
    helpUrl: ''
  },
  Code: function (block) {
    const nextTest = Blockly.JavaScript.valueToCode(block, 'nextTest', Blockly.JavaScript.ORDER_MEMBER)
    if (nextTest) {
      return `Joi.moment().${nextTest}`
    } else {
      return 'Joi.moment()'
    }
  }
}
