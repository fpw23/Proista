import Blockly from 'blockly'
import { Colors } from '../Colors'

export const SchemaFieldTypeBoolean = {
  Name: 'schema_fieldtype_boolean',
  Def: {
    type: 'schema_fieldtype_boolean',
    message0: 'Boolean Type %1',
    args0: [
      {
        type: 'input_value',
        name: 'nextTest',
        check: ['type_schema_test_any', 'type_schema_test_boolean']
      }
    ],
    previousStatement: 'type_schema_fieldtype',
    nextStatement: 'type_schema_fieldtype',
    colour: Colors.SchemaFieldTypeBoolean,
    tooltip: 'Boolean Field Type',
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
