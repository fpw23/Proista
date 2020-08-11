import { Colors } from '../../Colors'
import * as STH from '../BuildSchemaTestHelpers'

export const SchemaTestStringLength = {
  Name: 'schema_test_string_length',
  Def: {
    type: 'schema_test_string_length',
    message0: 'Length %1 %2',
    args0: [
      {
        type: 'field_input',
        name: 'value',
        text: '10'
      },
      {
        type: 'input_value',
        name: 'nextTest',
        check: ['type_schema_test_any', 'type_schema_test_string']
      }
    ],
    output: 'type_schema_test_string',
    colour: Colors.SchemaFieldTypeString,
    tooltip: 'Must be this length',
    helpUrl: ''
  },
  Code: function (block) {
    const value = block.getFieldValue('value')
    return STH.BuildSchemaTestReturn(block, `length(${value})`)
  }
}
