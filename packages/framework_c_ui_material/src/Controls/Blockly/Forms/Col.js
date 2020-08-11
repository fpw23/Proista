import { Colors } from './Colors'
import { getCodeForSingleBlock } from '@proista/client-ui-blockly/lib/index'
import { LayoutOptions } from './Shared'

export const Col = {
  Name: 'control_col',
  Def: {
    type: 'control_col',
    message0: 'Col %1 Layout %2 %3',
    args0: [
      {
        type: 'input_dummy'
      },
      LayoutOptions,
      {
        type: 'input_statement',
        name: 'Body',
        check: ['type_row', 'type_collection']
      }
    ],
    previousStatement: ['type_inputfield', 'type_col'],
    nextStatement: ['type_inputfield', 'type_col'],
    colour: Colors.Col,
    tooltip: 'Col which contains rows and has layout',
    helpUrl: ''
  },
  Code: function (block) {
    const dropdownLayout = block.getFieldValue('Layout')
    const children = []

    let currentChildBlock = block.getInputTargetBlock('Body')
    while (currentChildBlock) {
      var codeForBlock = getCodeForSingleBlock(currentChildBlock)
      children.push(codeForBlock)
      currentChildBlock = currentChildBlock.getNextBlock()
    }

    const code = `{
      "id": "${block.id}",
      "component": "Col",
      "props": {
        "layout": "${dropdownLayout}"
      },
      "children": [
        ${children.length > 0 ? children.join(',') : ''}
      ]
    }`

    return code
  }
}
