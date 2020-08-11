import { Colors } from './Colors'

export const OptionLookup = {
  Name: 'option_lookup',
  Def: {
    type: 'option_lookup',
    message0: 'Option Lookup Name %1 %2',
    args0: [
      {
        type: 'input_dummy'
      },
      {
        type: 'field_input',
        name: 'Name',
        text: ''
      }
    ],
    previousStatement: 'type_option_lookup',
    inputsInline: true,
    colour: Colors.OptionStatic,
    tooltip: 'Option filled from lookup name',
    helpUrl: ''
  },
  Code: function (block) {
    const name = block.getFieldValue('Name')
    return name
  }
}
