import * as V from '@proista/client-ui-blockly/lib/Validation/index'
import { AddBlock } from '@proista/client-ui-blockly/lib/index'
import _ from 'lodash'

export const RegisterBlocks = () => {
  // add root
  AddBlock(V.RootSchemaAnchor)
  AddBlock(V.SchemaField)
  AddBlock(V.SchemaObject)
  AddBlock(V.SchemaString)
  AddBlock(V.SchemaDate)
  AddBlock(V.SchemaBoolean)
  AddBlock(V.SchemaNumber)

  _.each(_.keys(V.Tests.Any), (key) => AddBlock(V.Tests.Any[key]))
  _.each(_.keys(V.Tests.String), (key) => AddBlock(V.Tests.String[key]))
  _.each(_.keys(V.Tests.Array), (key) => AddBlock(V.Tests.Array[key]))
  _.each(_.keys(V.Tests.Number), (key) => AddBlock(V.Tests.Number[key]))

  AddBlock(V.SchemaFieldTypeString)
  AddBlock(V.SchemaFieldTypeObject)
  AddBlock(V.SchemaFieldTypeArray)
  AddBlock(V.SchemaFieldTypeNumber)
  AddBlock(V.SchemaFieldTypeDate)
  AddBlock(V.SchemaFieldTypeBoolean)
}
