import { Colors } from './Colors'

export const BuildPropListItem = ({ Name, Prop, Title, DefaultValue = '', IsString = false }) => ({
  Name: `control_prop_listitem_${Name}`,
  Def: {
    type: `control_prop_listitem_${Name}`,
    message0: `Prop ${Title} %1 Value %2`,
    args0: [
      {
        type: 'input_dummy'
      },
      {
        type: 'field_input',
        name: 'Value',
        text: `${DefaultValue}`
      }
    ],
    inputsInline: true,
    previousStatement: 'type_control_prop_listitem',
    nextStatement: 'type_control_prop_listitem',
    colour: Colors.PropListItem,
    tooltip: 'Single item for a prop list',
    helpUrl: ''
  },
  Code: function (block) {
    const textValue = block.getFieldValue('Value')

    if (IsString === false) {
      return `"${Prop}": ${textValue}`
    } else {
      return `"${Prop}": "${textValue}"`
    }
  }
})
