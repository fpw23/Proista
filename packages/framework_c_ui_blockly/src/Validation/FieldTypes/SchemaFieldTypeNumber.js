import Blockly from 'blockly'
import { Colors } from '../Colors'

export const SchemaFieldTypeNumber = {
  Name: 'schema_fieldtype_number',
  Def: {
    type: 'schema_fieldtype_number',
    message0: 'Number Type %1',
    args0: [
      {
        type: 'input_value',
        name: 'nextTest',
        check: ['type_schema_test_any', 'type_schema_test_number']
      }
    ],
    previousStatement: 'type_schema_fieldtype',
    nextStatement: 'type_schema_fieldtype',
    colour: Colors.SchemaFieldTypeNumber,
    tooltip: 'Number Field Type',
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
