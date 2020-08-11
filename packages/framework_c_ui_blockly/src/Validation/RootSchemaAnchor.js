import { Colors } from './Colors'

export const RootSchemaAnchor = {
  Name: 'root_schemaanchor',
  Def: {
    type: 'root_schemaanchor',
    message0: 'Schema',
    nextStatement: 'type_schema_type',
    colour: Colors.Root,
    tooltip: 'Add something to me',
    helpUrl: ''
  },
  Code: function (block) {
    return `// Joi Schema Below
    `
  }
}
