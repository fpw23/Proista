import {
  Colors
} from '../../Colors'
import * as STH from '../BuildSchemaTestHelpers'
export const SchemaTestAnyLabel = {
  Name: 'schema_test_any_label',
  Def: {
    type: 'schema_test_any_label',
    message0: 'Label %1 %2',
    args0: [{
      type: 'field_input',
      name: 'value',
      text: ''
    }, {
      type: 'input_value',
      name: 'nextTest',
      check: ['type_schema_test_any']
    }],
    output: 'type_schema_test_any',
    colour: Colors.SchemaTest,
    tooltip: 'Change the name of the field in messages',
    helpUrl: ''
  },
  Code: function (block) {
    const value = block.getFieldValue('value')
    return STH.BuildSchemaTestReturn(block, `label('${value}')`)
  }
}
