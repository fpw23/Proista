import Blockly from 'blockly'
import { Colors } from './Colors'

export const SchemaString = {
  Name: 'schema_string',
  Def: {
    type: 'schema_string',
    message0: 'String %1',
    args0: [
      {
        type: 'input_value',
        name: 'nextTest',
        check: ['type_schema_test_any', 'type_schema_test_string']
      }
    ],
    previousStatement: 'type_schema_type',
    nextStatement: 'type_schema_type',
    colour: Colors.SchemaFieldTypeString,
    tooltip: 'String (must be string)',
    helpUrl: ''
  },
  Code: function (block) {
    const nextTest = Blockly.JavaScript.valueToCode(block, 'nextTest', Blockly.JavaScript.ORDER_MEMBER)
    if (nextTest) {
      return `Joi.string().${nextTest}`
    } else {
      return 'Joi.string()'
    }
  }
}
