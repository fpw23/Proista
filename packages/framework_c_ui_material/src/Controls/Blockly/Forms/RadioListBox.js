import { Colors } from './Colors'
import { LayoutOptions } from './Shared'
import { getCodeForSingleBlock } from '@proista/client-ui-blockly/lib/index'
import Blockly from 'blockly'

export const RadioListBox = {
  Name: 'control_radiolistbox',
  Def: {
    type: 'control_radiolistbox',
    message0: 'Radio List Name %1 Label %2 %3 Layout %4 %5 %6',
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
        type: 'input_statement',
        name: 'Options',
        check: [
          'type_option_static',
          'type_option_lookup'
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
    tooltip: 'Radio List Input',
    helpUrl: ''
  },
  Code: function (block) {
    const textName = block.getFieldValue('Name')
    const textLabel = block.getFieldValue('Label')
    const dropdownLayout = block.getFieldValue('Layout')
    const extraProps = Blockly.JavaScript.valueToCode(block, 'Props', 100) || ''

    let options = '[]'

    let currentChildBlock = block.getInputTargetBlock('Options')

    if (currentChildBlock) {
      if (currentChildBlock.type === 'option_lookup') {
        options = `"${getCodeForSingleBlock(currentChildBlock)}"`
      } else {
        const opts = []
        while (currentChildBlock) {
          var codeForBlock = getCodeForSingleBlock(currentChildBlock)
          opts.push(codeForBlock)
          currentChildBlock = currentChildBlock.getNextBlock()
        }
        options = `[${opts.length > 0 ? opts.join(',') : ''}]`
      }
    }

    const code = `{
      "id": "${block.id}",
      "component": "RadioListBox",
      "dataField": "${textName}",
      "props": {
          "name": "${textName}",
          "label": "${textLabel}",
          "layout": "${dropdownLayout}",
          "options": ${options}${extraProps !== '' ? `,
          ${extraProps}` : ''}
      }
    }`

    return code
  }
}
