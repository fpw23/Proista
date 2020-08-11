import * as FB from '@proista/client-ui-material/lib/Controls/Blockly/Forms/index'
import { AddBlock } from '@proista/client-ui-blockly/lib/index'
import _ from 'lodash'

export const RegisterBlocks = () => {
  // add root
  AddBlock(FB.RootForm)
  AddBlock(FB.Row)
  AddBlock(FB.Col)
  AddBlock(FB.PropList)
  _.each(FB.CommonProps, (p) => AddBlock(p))
  AddBlock(FB.PropListItemComplex)

  AddBlock(FB.FormBoxHeader)

  AddBlock(FB.TextBox)
  _.each(FB.TextBoxProps, (p) => AddBlock(p))

  AddBlock(FB.CheckBox)

  AddBlock(FB.ComboBox)
  _.each(FB.ComboBoxProps, (p) => AddBlock(p))

  AddBlock(FB.NumberBox)
  _.each(FB.NumberBoxProps, (p) => AddBlock(p))

  AddBlock(FB.OptionLookup)
  AddBlock(FB.OptionStatic)
}
