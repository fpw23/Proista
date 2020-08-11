import Blockly from 'blockly'
import { Colors } from '../Colors'

export const SchemaFieldTypeString = {
  Name: 'schema_fieldtype_string',
  Def: {
    type: 'schema_fieldtype_string',
    message0: 'String Type %1',
    args0: [
      {
        type: 'input_value',
        name: 'nextTest',
        check: ['type_schema_test_any', 'type_schema_test_string']
      }
    ],
    previousStatement: 'type_schema_fieldtype',
    nextStatement: 'type_schema_fieldtype',
    colour: Colors.SchemaFieldTypeString,
    tooltip: 'String Field Type',
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
