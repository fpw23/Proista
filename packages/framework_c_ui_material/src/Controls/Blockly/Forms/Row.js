import { Colors } from './Colors'
import { getCodeForSingleBlock } from '@proista/client-ui-blockly/lib/index'

export const Row = {
  Name: 'control_row',
  Def: {
    type: 'control_row',
    message0: 'Row %1 %2',
    args0: [
      {
        type: 'input_dummy'
      },
      {
        type: 'input_statement',
        name: 'Body',
        check: ['type_inputfield', 'type_col']
      }
    ],
    previousStatement: ['type_header', 'type_row'],
    nextStatement: ['type_header', 'type_row'],
    colour: Colors.Row,
    tooltip: 'Row which contains other stuff',
    helpUrl: ''
  },
  Code: function (block) {
    const children = []

    let currentChildBlock = block.getInputTargetBlock('Body')
    while (currentChildBlock) {
      var codeForBlock = getCodeForSingleBlock(currentChildBlock)
      children.push(codeForBlock)
      currentChildBlock = currentChildBlock.getNextBlock()
    }

    const code = `{
      "id": "${block.id}",
      "component": "Row",
      "children": [
        ${children.length > 0 ? children.join(',') : ''}
      ]
    }`

    return code
  }
}
