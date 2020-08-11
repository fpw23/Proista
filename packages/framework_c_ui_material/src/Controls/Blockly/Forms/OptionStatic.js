import { Colors } from './Colors'

export const OptionStatic = {
  Name: 'option_static',
  Def: {
    type: 'option_static',
    message0: 'Option %1 Text %2 %3 Value %4',
    args0: [
      {
        type: 'input_dummy'
      },
      {
        type: 'field_input',
        name: 'Text',
        text: ''
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'field_input',
        name: 'Value',
        text: ''
      }
    ],
    inputsInline: true,
    previousStatement: 'type_option_static',
    nextStatement: 'type_option_static',
    colour: Colors.OptionStatic,
    tooltip: 'Static Option',
    helpUrl: ''
  },
  Code: function (block) {
    const text = block.getFieldValue('Text')
    const value = block.getFieldValue('Value')

    const code = `{
      "Text": "${text}",
      "Value": "${value}"
    }`

    return code
  }
}
