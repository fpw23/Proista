// Tests
// Any
import { SchemaTestAnyRequired } from './Tests/Any/SchemaTestRequired'
import { SchemaTestAnyMessage } from './Tests/Any/SchemaTestMessage'
import { SchemaTestAnyLabel } from './Tests/Any/SchemaTestLabel'
import { SchemaTestAnyAllow } from './Tests/Any/SchemaTestAllow'
import { SchemaTestAnyError } from './Tests/Any/SchemaTestError'
// String
import { SchemaTestStringLength } from './Tests/String/SchemaTestLength'
import { SchemaTestStringCase } from './Tests/String/SchemaTestCase'
import { SchemaTestStringGuid } from './Tests/String/SchemaTestGuid'
import { SchemaTestStringEmail } from './Tests/String/SchemaTestEmail'
// Array
import { SchemaTestArrayLength } from './Tests/Array/SchemaTestLength'
import { SchemaTestArrayMin } from './Tests/Array/SchemaTestMin'
import { SchemaTestArrayMax } from './Tests/Array/SchemaTestMax'
// Number
import { SchemaTestNumberGreater } from './Tests/Number/SchemaTestGreater'
import { SchemaTestNumberLess } from './Tests/Number/SchemaTestLess'
import { SchemaTestNumberMin } from './Tests/Number/SchemaTestMin'
import { SchemaTestNumberMax } from './Tests/Number/SchemaTestMax'

// Field
export * from './SchemaField'

// Types
export * from './SchemaObject'
export * from './SchemaBoolean'
export * from './SchemaNumber'
export * from './SchemaString'
export * from './SchemaDate'

// Field Types
export * from './FieldTypes/SchemaFieldTypeString'
export * from './FieldTypes/SchemaFieldTypeObject'
export * from './FieldTypes/SchemaFieldTypeArray'
export * from './FieldTypes/SchemaFieldTypeNumber'
export * from './FieldTypes/SchemaFieldTypeDate'
export * from './FieldTypes/SchemaFieldTypeBoolean'

// Tests
export const Tests = {
  Any: {
    SchemaTestAnyRequired,
    SchemaTestAnyMessage,
    SchemaTestAnyLabel,
    SchemaTestAnyAllow,
    SchemaTestAnyError
  },
  String: {
    SchemaTestStringLength,
    SchemaTestStringCase,
    SchemaTestStringGuid,
    SchemaTestStringEmail
  },
  Array: {
    SchemaTestArrayLength,
    SchemaTestArrayMin,
    SchemaTestArrayMax
  },
  Number: {
    SchemaTestNumberGreater,
    SchemaTestNumberLess,
    SchemaTestNumberMin,
    SchemaTestNumberMax
  }
}

// Colors
export * from './Colors'

// Root
export * from './RootSchemaAnchor'
