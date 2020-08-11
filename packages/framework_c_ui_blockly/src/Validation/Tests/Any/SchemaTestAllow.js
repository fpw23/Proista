import {
  Colors
} from '../../Colors'
import * as STH from '../BuildSchemaTestHelpers'
export const SchemaTestAnyAllow = {
  Name: 'schema_test_any_allow',
  Def: {
    type: 'schema_test_any_allow',
    message0: 'Allow %1 %2',
    args0: [{
      type: 'field_input',
      name: 'value',
      text: '10'
    }, {
      type: 'input_value',
      name: 'nextTest',
      check: ['type_schema_test_any']
    }],
    output: 'type_schema_test_any',
    colour: Colors.SchemaTest,
    tooltip: 'Only allow these values',
    helpUrl: ''
  },
  Code: function (block) {
    const value = block.getFieldValue('value')
    return STH.BuildSchemaTestReturn(block, `allow(${value})`)
  }
}
