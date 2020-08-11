import { Colors } from '../../Colors'
import * as STH from '../BuildSchemaTestHelpers'

export const SchemaTestAnyRequired = {
  Name: 'schema_test_any_required',
  Def: {
    type: 'schema_test_any_required',
    message0: 'Required %1',
    args0: [
      {
        type: 'input_value',
        name: 'nextTest',
        check: ['type_schema_test_any']
      }
    ],
    output: 'type_schema_test_any',
    colour: Colors.SchemaTest,
    tooltip: 'Can not be undefined',
    helpUrl: ''
  },
  Code: function (block) {
    return STH.BuildSchemaTestReturn(block, 'required()')
  }
}
