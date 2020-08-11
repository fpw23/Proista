import {
  Colors
} from '../../Colors'
import * as STH from '../BuildSchemaTestHelpers'
export const SchemaTestNumberGreater = {
  Name: 'schema_test_number_greater',
  Def: {
    type: 'schema_test_number_greater',
    message0: 'Greater %1 %2',
    args0: [{
      type: 'field_input',
      name: 'value',
      text: '10'
    }, {
      type: 'input_value',
      name: 'nextTest',
      check: ['type_schema_test_any', 'type_schema_test_number']
    }],
    output: 'type_schema_test_number',
    colour: Colors.SchemaFieldTypeNumber,
    tooltip: 'Must be greater than',
    helpUrl: ''
  },
  Code: function (block) {
    const value = block.getFieldValue('value')
    return STH.BuildSchemaTestReturn(block, `greater(${value})`)
  }
}
