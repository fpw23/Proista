import {
  Colors
} from '../../Colors'
import * as STH from '../BuildSchemaTestHelpers'
export const SchemaTestStringEmail = {
  Name: 'schema_test_string_email',
  Def: {
    type: 'schema_test_string_email',
    message0: 'Email %1 ',
    args0: [{
      type: 'input_value',
      name: 'nextTest',
      check: ['type_schema_test_any', 'type_schema_test_string']
    }],
    output: 'type_schema_test_string',
    colour: Colors.SchemaFieldTypeString,
    tooltip: 'Is Valid Email',
    helpUrl: ''
  },
  Code: function (block) {
    return STH.BuildSchemaTestReturn(block, 'email()')
  }
}
