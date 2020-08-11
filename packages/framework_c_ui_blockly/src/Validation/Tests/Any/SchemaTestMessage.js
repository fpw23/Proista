import {
  Colors
} from '../../Colors'
import Blockly from 'blockly'
export const SchemaTestAnyMessage = {
  Name: 'schema_test_any_message',
  Def: {
    type: 'schema_test_any_message',
    message0: 'Message %1',
    args0: [{
      type: 'field_input',
      name: 'value',
      text: ''
    }],
    output: 'type_schema_test_any',
    colour: Colors.SchemaTest,
    tooltip: 'Test Message ()',
    helpUrl: ''
  },
  Code: function (block) {
    const value = block.getFieldValue('value')
    return [`message('${value}')`, Blockly.JavaScript.ORDER_MEMBER]
  }
}
