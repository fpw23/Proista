import { Colors } from './Colors'
import { LayoutOptions } from './Shared'
import Blockly from 'blockly'
import { BuildPropListItem } from './PropListItem'

export const TextBoxProps = [
  BuildPropListItem({ Name: 'textbox_rows', Prop: 'rows', Title: 'Rows', DefaultValue: 5 }),
  BuildPropListItem({ Name: 'textbox_multiline', Prop: 'rows', Title: 'Multiline', DefaultValue: true })
]

export const TextBox = {
  Name: 'control_textbox',
  Def: {
    type: 'control_textbox',
    message0: ' Text Name %1 Label %2 %3 Layout %4 %5 %6',
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
        type: 'field_dropdown',
        name: 'Type',
        options: [
          ['Text', 'text'],
          ['Password', 'password']
        ]
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
    tooltip: 'Text Input',
    helpUrl: ''
  },
  Code: function (block) {
    const textName = block.getFieldValue('Name')
    const textLabel = block.getFieldValue('Label')
    const dropdownLayout = block.getFieldValue('Layout')
    const dropdownType = block.getFieldValue('Type')
    const extraProps = Blockly.JavaScript.valueToCode(block, 'Props', 100) || ''

    const code = `{
      "id": "${block.id}",
      "component": "TextBox",
      "dataField": "${textName}",
      "props": {
          "name": "${textName}",
          "label": "${textLabel}",
          "password": ${dropdownType === 'password' ? 'true' : 'false'},
          "layout": "${dropdownLayout}"${extraProps !== '' ? `,
          ${extraProps}` : ''}
      }
    }`

    return code
  }
}
