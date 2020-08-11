import { Colors } from '@proista/client-ui-blockly/lib/index'

export const BuildToolBoxConfig = () => {
  return `
  <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
  <category name="Any" colour="${Colors.SchemaTest}">
      <block type="schema_test_any_required"></block>
      <block type="schema_test_any_label"></block>
      <block type="schema_test_any_allow"></block>
      <block type="schema_test_any_error"></block>
    </category>
    <category name="String" colour="${Colors.SchemaFieldTypeString}">
      <block type="schema_string"></block>
      <block type="schema_field">
        <value name="SchemaFieldType">
          <block type="schema_fieldtype_string"></block>
        </value>
      </block>
      <block type="schema_test_string_length"></block>
      <block type="schema_test_string_case"></block>
      <block type="schema_test_string_guid"></block>
      <block type="schema_test_string_email"></block>
    </category>
    <category name="Array" colour="${Colors.SchemaFieldTypeArray}">
      <block type="schema_field">
        <value name="SchemaFieldType">
          <block type="schema_fieldtype_array"></block>
        </value>
      </block>
      <block type="schema_test_array_length"></block>
      <block type="schema_test_array_min"></block>
      <block type="schema_test_array_max"></block>
    </category>
    <category name="Number" colour="${Colors.SchemaFieldTypeNumber}">
      <block type="schema_number"></block>
      <block type="schema_field">
        <value name="SchemaFieldType">
          <block type="schema_fieldtype_number"></block>
        </value>
      </block>
      <block type="schema_test_number_greater"></block>
      <block type="schema_test_number_less"></block>
      <block type="schema_test_number_min"></block>
      <block type="schema_test_number_max"></block>
    </category>
    <category name="Boolean" colour="${Colors.SchemaFieldTypeBoolean}">
      <block type="schema_boolean"></block>
      <block type="schema_field">
        <value name="SchemaFieldType">
          <block type="schema_fieldtype_boolean"></block>
        </value>
      </block>
    </category>
    <category name="Date" colour="${Colors.SchemaFieldTypeDate}">
      <block type="schema_date"></block>
      <block type="schema_field">
        <value name="SchemaFieldType">
          <block type="schema_fieldtype_date"></block>
        </value>
      </block>
    </category>
    <category name="Object" colour="${Colors.SchemaFieldTypeObject}">
      <block type="schema_object"></block>
      <block type="schema_field">
        <value name="SchemaFieldType">
          <block type="schema_fieldtype_object"></block>
        </value>
      </block>
    </category>
  </xml>
  `
}
