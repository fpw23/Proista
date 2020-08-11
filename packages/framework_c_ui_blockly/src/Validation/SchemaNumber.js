import Blockly from 'blockly'
import { Colors } from './Colors'

export const SchemaNumber = {
  Name: 'schema_number',
  Def: {
    type: 'schema_number',
    message0: 'Number %1',
    args0: [
      {
        type: 'input_value',
        name: 'nextTest',
        check: ['type_schema_test_any', 'type_schema_test_number']
      }
    ],
    previousStatement: 'type_schema_type',
    nextStatement: 'type_schema_type',
    colour: Colors.SchemaFieldTypeNumber,
    tooltip: 'Number (must be number)',
    helpUrl: ''
  },
  Code: function (block) {
    const nextTest = Blockly.JavaScript.valueToCode(block, 'nextTest', Blockly.JavaScript.ORDER_MEMBER)
    if (nextTest) {
      return `Joi.number().${nextTest}`
    } else {
      return 'Joi.number()'
    }
  }
}
