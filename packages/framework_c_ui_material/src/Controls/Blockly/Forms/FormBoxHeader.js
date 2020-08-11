import { Colors } from './Colors'

export const FormBoxHeader = {
  Name: 'control_formboxheader',
  Def: {
    type: 'control_formboxheader',
    message0: 'Header %1',
    args0: [
      {
        type: 'field_input',
        name: 'Title',
        text: ''
      }
    ],
    inputsInline: true,
    previousStatement: ['type_header', 'type_row'],
    nextStatement: ['type_header', 'type_row'],
    colour: Colors.Header,
    tooltip: 'Form Header',
    helpUrl: ''
  },
  Code: function (block) {
    const textTitle = block.getFieldValue('Title')

    const code = `{
      "id": "${block.id}",
      "component": "FormBoxHeader",
      "props": {
          "Title": "${textTitle}"
      }
    }`

    return code
  }
}
