import Blockly from 'blockly'
import { Colors } from '../Colors'

export const SchemaFieldTypeDate = {
  Name: 'schema_fieldtype_date',
  Def: {
    type: 'schema_fieldtype_date',
    message0: 'Date Type %1',
    args0: [
      {
        type: 'input_value',
        name: 'nextTest',
        check: ['type_schema_test_any', 'type_schema_test_date']
      }
    ],
    previousStatement: 'type_schema_fieldtype',
    nextStatement: 'type_schema_fieldtype',
    colour: Colors.SchemaFieldTypeDate,
    tooltip: 'Date Field Type',
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
