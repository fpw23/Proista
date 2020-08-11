import { Colors } from './Colors'
import { LayoutOptions } from './Shared'
import Blockly from 'blockly'
import { BuildPropListItem } from './PropListItem'

export const NumberBoxProps = [
  BuildPropListItem({ Name: 'numberbox_prefix', Prop: 'prefix', Title: 'Prefix', DefaultValue: '$', IsString: true }),
  BuildPropListItem({ Name: 'numberbox_decimalScale', Prop: 'decimalScale', Title: 'Decimal Scale', DefaultValue: 0 }),
  BuildPropListItem({ Name: 'numberbox_fixedDecimalScale', Prop: 'fixedDecimalScale', Title: 'Fixed Decimal Scale', DefaultValue: true }),
  BuildPropListItem({ Name: 'numberbox_thousandSeparator', Prop: 'thousandSeparator', Title: 'Thousand Separator', DefaultValue: ',', IsString: true })
]

export const NumberBox = {
  Name: 'control_numberbox',
  Def: {
    type: 'control_numberbox',
    message0: ' Number Name %1 Label %2 %3 Layout %4 %5 %6',
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
          ['Standard', 'standard'],
          ['Currency', 'currency'],
          ['Currency With Cents', 'currencyWithCents'],
          ['Custom', 'custom']
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
    tooltip: 'Number Input',
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
      "component": "NumberBox",
      "dataField": "${textName}",
      "props": {
          "name": "${textName}",
          "label": "${textLabel}",
          "type": "${dropdownType || 'Basic'}",
          "layout": "${dropdownLayout}"${extraProps !== '' ? `,
          ${extraProps}` : ''}
      }
    }`

    return code
  }
}
