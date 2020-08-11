import { Colors } from './Colors'
import { getCodeForSingleBlock } from '../Shared'

export const SchemaObject = {
  Name: 'schema_object',
  Def: {
    type: 'schema_object',
    message0: 'Object %1 %2',
    args0: [
      {
        type: 'input_dummy'
      },
      {
        type: 'input_statement',
        name: 'fields',
        check: 'type_schema_field'
      }
    ],
    previousStatement: 'type_schema_type',
    nextStatement: 'type_schema_type',
    colour: Colors.SchemaType,
    tooltip: 'New Object',
    helpUrl: ''
  },
  Code: function (block) {
    const fields = []

    let currentField = block.getInputTargetBlock('fields')

    while (currentField) {
      var fieldCode = getCodeForSingleBlock(currentField)
      fields.push(fieldCode)
      currentField = currentField.getNextBlock()
    }

    const code = `Joi.object({
      ${fields.join(`,
      `)}
    })`
    return code
  }
}
