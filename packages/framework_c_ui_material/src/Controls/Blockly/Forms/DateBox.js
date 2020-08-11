import { Colors } from './Colors'
import { LayoutOptions } from './Shared'
import Blockly from 'blockly'

export const DateBox = {
  Name: 'control_datebox',
  Def: {
    type: 'control_datebox',
    message0: 'Date Name %1 Label %2 %3 Layout %4 %5',
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
    tooltip: 'Date Input',
    helpUrl: ''
  },
  Code: function (block) {
    const textName = block.getFieldValue('Name')
    const textLabel = block.getFieldValue('Label')
    const dropdownLayout = block.getFieldValue('Layout')
    const extraProps = Blockly.JavaScript.valueToCode(block, 'Props', 100) || ''

    const code = `{
      "id": "${block.id}",
      "component": "DateBox",
      "dataField": "${textName}",
      "props": {
          "name": "${textName}",
          "label": "${textLabel}",
          "layout": "${dropdownLayout}"${extraProps !== '' ? `,
          ${extraProps}` : ''}
      }
    }`

    return code
  }
}
