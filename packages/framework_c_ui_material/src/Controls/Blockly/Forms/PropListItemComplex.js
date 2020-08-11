import { Colors } from './Colors'
import { getCodeForSingleBlock } from '@proista/client-ui-blockly/lib/index'

export const PropListItemComplex = {
  Name: 'control_prop_listitem_complex',
  Def: {
    type: 'control_prop_listitem_complex',
    message0: 'Complex Prop %1 %2 %3',
    args0: [
      {
        type: 'input_dummy'
      },
      {
        type: 'field_input',
        name: 'Name',
        text: ''
      },
      {
        type: 'input_statement',
        name: 'Props',
        check: 'type_control_prop_listitem'
      }
    ],
    previousStatement: 'type_control_prop_listitem',
    nextStatement: 'type_control_prop_listitem',
    colour: Colors.PropListItem,
    tooltip: 'Complex Prop',
    helpUrl: ''
  },
  Code: function (block) {
    const props = []

    const name = block.getFieldValue('Name')
    let currentProp = block.getInputTargetBlock('Props')

    while (currentProp) {
      var propCode = getCodeForSingleBlock(currentProp)
      props.push(propCode)
      currentProp = currentProp.getNextBlock()
    }
    const code = `"${name}": {
      ${props.join(`,
      `)}
    }`
    return code
  }
}
