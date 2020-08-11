import { Colors } from './Colors'
import { getCodeForSingleBlock } from '@proista/client-ui-blockly/lib/index'
import { BuildPropListItem } from './PropListItem'

export const CommonProps = [
  BuildPropListItem({ Name: 'commonbox_caption', Prop: 'caption', Title: 'Caption', DefaultValue: 'Caption Text', IsString: true }),
  BuildPropListItem({ Name: 'commonbox_readonly', Prop: 'readonly', Title: 'Read Only', DefaultValue: true }),
  BuildPropListItem({ Name: 'commonbox_initialValueRaw', Prop: 'initialValue', Title: 'Initial Value (Non String)', DefaultValue: undefined }),
  BuildPropListItem({ Name: 'commonbox_initialValueString', Prop: 'initialValue', Title: 'Initial Value (String)', DefaultValue: '', IsString: true })
]

export const PropList = {
  Name: 'control_prop_list',
  Def: {
    type: 'control_prop_list',
    message0: 'Prop List %1 %2',
    args0: [
      {
        type: 'input_dummy'
      },
      {
        type: 'input_statement',
        name: 'Props',
        check: [
          'type_control_prop_listitem'
        ]
      }
    ],
    inputsInline: true,
    output: 'type_control_prop_list',
    colour: Colors.Field,
    tooltip: 'List of props for a control',
    helpUrl: ''
  },
  Code: function (block) {
    const props = []

    let currentProp = block.getInputTargetBlock('Props')

    while (currentProp) {
      var propCode = getCodeForSingleBlock(currentProp)
      props.push(propCode)
      currentProp = currentProp.getNextBlock()
    }

    const code = `${props.join(`,
    `)}`

    return [code, 0]
  }
}
