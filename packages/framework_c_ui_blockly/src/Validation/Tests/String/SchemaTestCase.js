import {
  Colors
} from '../../Colors'
import * as STH from '../BuildSchemaTestHelpers'
export const SchemaTestStringCase = {
  Name: 'schema_test_string_case',
  Def: {
    type: 'schema_test_string_case',
    message0: 'Case %1 %2',
    args0: [{
      type: 'field_dropdown',
      name: 'value',
      options: [
        ['Upper', 'upper'],
        ['Lower', 'lower']
      ]
    }, {
      type: 'input_value',
      name: 'nextTest',
      check: ['type_schema_test_any', 'type_schema_test_string']
    }],
    output: 'type_schema_test_string',
    colour: Colors.SchemaFieldTypeString,
    tooltip: 'Must be this case',
    helpUrl: ''
  },
  Code: function (block) {
    const value = block.getFieldValue('value')
    return STH.BuildSchemaTestReturn(block, `case('${value}')`)
  }
}
