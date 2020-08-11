import {
  Colors
} from '../../Colors'
import * as STH from '../BuildSchemaTestHelpers'
export const SchemaTestStringGuid = {
  Name: 'schema_test_string_guid',
  Def: {
    type: 'schema_test_string_guid',
    message0: 'GUID %1',
    args0: [{
      type: 'input_value',
      name: 'nextTest',
      check: ['type_schema_test_any', 'type_schema_test_string']
    }],
    output: 'type_schema_test_string',
    colour: Colors.SchemaFieldTypeString,
    tooltip: 'Must be a guid',
    helpUrl: ''
  },
  Code: function (block) {
    return STH.BuildSchemaTestReturn(block, 'guid()')
  }
}
