import { Colors } from './Colors'
import { LayoutOptions } from './Shared'
import Blockly from 'blockly'

export const CheckBox = {
  Name: 'control_checkbox',
  Def: {
    type: 'control_checkbox',
    message0: ' Check Name %1 Label %2 %3 Layout %4 Text %5 %6',
    args0: [
      {
        type: 'field_input',
        name: 'Name',
        text: ''
      },
      {
        type: 'field_input',
        name: 'Label',
        text: ''
      },
      {
        type: 'input_dummy'
      },
      LayoutOptions,
      {
        type: 'field_input',
        name: 'Text',
        text: ''
      },
      {
        type: 'input_value',
        name: 'Props',
        check: [
          'type_control_prop_list'
        ]
      }
    ],
    previousStatement: 'type_inputfield',
    nextStatement: 'type_inputfield',
    colour: Colors.Field,
    tooltip: 'Single True/False Input',
    helpUrl: ''
  },
  Code: function (block) {
    const textName = block.getFieldValue('Name')
    const textLabel = block.getFieldValue('Label')
    const dropdownLayout = block.getFieldValue('Layout')
    const checkboxText = block.getFieldValue('Text')
    const extraProps = Blockly.JavaScript.valueToCode(block, 'Props', 100) || ''

    const code = `{
      "id": "${block.id}",
      "component": "CheckBox",
      "dataField": "${textName}",
      "props": {
          "name": "${textName}",
          "label": "${textLabel}",
          "text": "${checkboxText}",
          "layout": "${dropdownLayout}"${extraProps !== '' ? `,
          ${extraProps}` : ''}
      }
    }`

    return code
  }
}
