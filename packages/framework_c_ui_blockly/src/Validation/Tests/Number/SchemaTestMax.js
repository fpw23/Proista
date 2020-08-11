import {
  Colors
} from '../../Colors'
import * as STH from '../BuildSchemaTestHelpers'
export const SchemaTestNumberMax = {
  Name: 'schema_test_number_max',
  Def: {
    type: 'schema_test_number_max',
    message0: 'Max %1 %2',
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
    tooltip: 'Can not be greater than',
    helpUrl: ''
  },
  Code: function (block) {
    const value = block.getFieldValue('value')
    return STH.BuildSchemaTestReturn(block, `max(${value})`)
  }
}
