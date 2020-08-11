import Blockly from 'blockly'
import { Colors } from './Colors'

export const SchemaBoolean = {
  Name: 'schema_boolean',
  Def: {
    type: 'schema_boolean',
    message0: 'Boolean %1',
    args0: [
      {
        type: 'input_value',
        name: 'nextTest',
        check: ['type_schema_test_any', 'type_schema_test_boolean']
      }
    ],
    previousStatement: 'type_schema_type',
    nextStatement: 'type_schema_type',
    colour: Colors.SchemaFieldTypeBoolean,
    tooltip: 'Boolean (must be a boolean)',
    helpUrl: ''
  },
  Code: function (block) {
    const nextTest = Blockly.JavaScript.valueToCode(block, 'nextTest', Blockly.JavaScript.ORDER_MEMBER)
    if (nextTest) {
      return `Joi.boolean().${nextTest}`
    } else {
      return 'Joi.boolean()'
    }
  }
}
