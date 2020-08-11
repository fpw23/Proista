import {
  Colors
} from '../../Colors'
import * as STH from '../BuildSchemaTestHelpers'
export const SchemaTestAnyError = {
  Name: 'schema_test_any_error',
  Def: {
    type: 'schema_test_any_error',
    message0: 'Error %1 %2',
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
    tooltip: 'For showing custom message',
    helpUrl: ''
  },
  Code: function (block) {
    const value = block.getFieldValue('value')
    return STH.BuildSchemaTestReturn(block, `error(new Error('${value}'))`)
  }
}
