import Blockly from 'blockly'
import { Colors } from '../Colors'
import { getCodeForSingleBlock } from '../../Shared'

export const SchemaFieldTypeObject = {
  Name: 'schema_fieldtype_object',
  Def: {
    type: 'schema_fieldtype_object',
    message0: 'Object Type %1 %2',
    args0: [
      {
        type: 'input_statement',
        name: 'fields',
        check: 'type_schema_field'
      },
      {
        type: 'input_value',
        name: 'nextTest',
        check: ['type_schema_test_any', 'type_schema_test_object']
      }
    ],
    previousStatement: 'type_schema_fieldtype',
    nextStatement: 'type_schema_fieldtype',
    colour: Colors.SchemaFieldTypeObject,
    tooltip: 'Object Field Type',
    helpUrl: ''
  },
  Code: function (block) {
    const nextTest = Blockly.JavaScript.valueToCode(block, 'nextTest', Blockly.JavaScript.ORDER_MEMBER)

    const fields = []

    let currentField = block.getInputTargetBlock('fields')

    while (currentField) {
      var fieldCode = getCodeForSingleBlock(currentField)
      fields.push(fieldCode)
      currentField = currentField.getNextBlock()
    }

    if (nextTest) {
      return `Joi.object({
        ${fields.join(`,
        `)}
      }).${nextTest}`
    } else {
      return `Joi.object({
        ${fields.join(`,
        `)}
      })`
    }
  }
}
