import { Colors } from './Colors'
import { getCodeForSingleBlock } from '@proista/client-ui-blockly/lib/index'
import Blockly from 'blockly'

export const CollectionBox = {
  Name: 'control_collectionbox',
  Def: {
    type: 'control_collectionbox',
    message0: 'Collection Name %1 %2 Layout %3 %4',
    args0: [
      {
        type: 'field_input',
        name: 'Name',
        text: ''
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'input_statement',
        name: 'Body',
        check: [
          'type_inputfield',
          'type_col'
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
    previousStatement: ['type_inputfield', 'type_collection'],
    nextStatement: ['type_inputfield', 'type_collection'],
    colour: Colors.Collection,
    tooltip: 'Collection',
    helpUrl: ''
  },
  Code: function (block) {
    const textName = block.getFieldValue('Name')
    const extraProps = Blockly.JavaScript.valueToCode(block, 'Props', 100) || ''

    const children = []

    let currentChildBlock = block.getInputTargetBlock('Body')
    while (currentChildBlock) {
      var codeForBlock = getCodeForSingleBlock(currentChildBlock)
      children.push(codeForBlock)
      currentChildBlock = currentChildBlock.getNextBlock()
    }

    const code = `{
      "id": "${block.id}",
      "component": "CollectionBox",
      "dataField": "${textName}",
      "props": {
          "name": "${textName}"${extraProps !== '' ? `,
          ${extraProps}` : ''}
      },
      "body": [
        ${children.length > 0 ? children.join(',') : ''}
      ]
    }`

    return code
  }
}
