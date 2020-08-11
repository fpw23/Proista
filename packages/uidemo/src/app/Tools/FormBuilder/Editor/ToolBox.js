import { SharedColors } from '@proista/client-ui-blockly/lib/index'
import { Colors } from '@proista/client-ui-material/lib/Controls/Blockly/Forms/index'

export const BuildToolBoxConfig = () => {
  return `
  <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
  <category name="Common" colour="${SharedColors.Basic}">
    <category name="Controls" colour="${SharedColors.Basic}">
      <block type="control_row"></block>
      <block type="control_col"></block>
      <block type="control_formboxheader"></block>
    </category>
    <category name="Options" colour="${SharedColors.Basic}">
      <block type="option_static"></block>
      <block type="option_lookup"></block>
    </category>
    <category name="Props" colour="${SharedColors.Basic}">
      <block type="control_prop_list"></block>
      <block type="control_prop_listitem_complex"></block>
      <block type="control_prop_listitem_commonbox_caption"></block>
      <block type="control_prop_listitem_commonbox_readonly"></block>
      <block type="control_prop_listitem_commonbox_initialValueRaw"></block>
      <block type="control_prop_listitem_commonbox_initialValueString"></block>
    </category>
  </category>
  <category name="Fields" colour="${Colors.Field}">
    <category name="Text" colour="${Colors.Field}">
      <block type="control_textbox"></block>
      <block type="control_textbox">
        <value name="Props">
          <block type="control_prop_list"></block>
        </value>
      </block>
      <block type="control_prop_listitem_textbox_rows"></block>
      <block type="control_prop_listitem_textbox_multiline"></block>
    </category>
    <category name="Combo" colour="${Colors.Field}">
      <block type="control_combobox"></block>
      <block type="control_combobox">
        <value name="Props">
          <block type="control_prop_list"></block>
        </value>
      </block>
      <block type="control_prop_listitem_combobox_autosetFirstOption"></block>
    </category>
    <category name="Check Box" colour="${Colors.Field}">
      <block type="control_checkbox"></block>
      <block type="control_checkbox">
        <value name="Props">
          <block type="control_prop_list"></block>
        </value>
      </block>
    </category>
    <category name="Number" colour="${Colors.Field}">
      <block type="control_numberbox"></block>
      <block type="control_numberbox">
          <field name="Type">custom</field>
          <value name="Props">
            <block type="control_prop_list">
              <value name="Props">
                <block type="control_prop_listitem_complex">
                <field name="Name">customFormat</field>
                </block>
              </value>
            </block>
          </value>
      </block>
      <block type="control_prop_listitem_numberbox_decimalScale"></block>
      <block type="control_prop_listitem_numberbox_prefix"></block>
      <block type="control_prop_listitem_numberbox_fixedDecimalScale"></block>
      <block type="control_prop_listitem_numberbox_thousandSeparator"></block>
    </category>
  </category>
  </xml>
  `
}
