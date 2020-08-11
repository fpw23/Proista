import {
  Colors
} from '../../Colors'
import * as STH from '../BuildSchemaTestHelpers'
export const SchemaTestNumberMin = {
  Name: 'schema_test_number_min',
  Def: {
    type: 'schema_test_number_min',
    message0: 'Min %1 %2',
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
    tooltip: 'Can not be less than',
    helpUrl: ''
  },
  Code: function (block) {
    const value = block.getFieldValue('value')
    return STH.BuildSchemaTestReturn(block, `min(${value})`)
  }
}
