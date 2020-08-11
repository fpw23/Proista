import { Colors } from './Colors'
import { getCodeForSingleBlock } from '@proista/client-ui-blockly/lib/index'

export const RootForm = {
  Name: 'root_form',
  Def: {
    type: 'root_form',
    message0: 'Form %1 %2',
    args0: [
      {
        type: 'input_dummy'
      },
      {
        type: 'input_statement',
        name: 'Body',
        check: ['type_row', 'type_header']
      }
    ],
    colour: Colors.Root,
    tooltip: 'Root wrapper for a Form',
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

    const code = `[
        ${children.length > 0 ? children.join(',') : ''}
      ]`
    return code
  }
}
