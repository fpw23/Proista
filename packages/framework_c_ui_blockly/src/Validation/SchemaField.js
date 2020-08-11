import { Colors } from './Colors'
import Blockly from 'blockly'

export const SchemaField = {
  Name: 'schema_field',
  Def: {
    type: 'schema_field',
    message0: 'Field %1 As %2',
    args0: [
      {
        type: 'field_input',
        name: 'fieldName',
        text: ''
      },
      {
        type: 'input_statement',
        name: 'SchemaFieldType',
        check: 'type_schema_fieldtype'
      }
    ],
    previousStatement: 'type_schema_field',
    nextStatement: 'type_schema_field',
    colour: Colors.SchemaField,
    tooltip: '',
    helpUrl: ''
  },
  Code: function (block) {
    const fieldName = block.getFieldValue('fieldName')
    const schemaFieldType = Blockly.JavaScript.statementToCode(block, 'SchemaFieldType')
    if (schemaFieldType) {
      return `${fieldName}:${schemaFieldType}`
    } else {
      return `${fieldName}:null`
    }
  }
}
