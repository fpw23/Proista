import Blockly from 'blockly'
import { Colors } from '../Colors'
import { getCodeForSingleBlock } from '../../Shared'

export const SchemaFieldTypeArray = {
  Name: 'schema_fieldtype_array',
  Def: {
    type: 'schema_fieldtype_array',
    message0: 'Array Type %1 %2',
    args0: [
      {
        type: 'input_statement',
        name: 'items',
        check: ['type_schema_type']
      },
      {
        type: 'input_value',
        name: 'nextTest',
        check: ['type_schema_test_any', 'type_schema_test_array']
      }
    ],
    previousStatement: 'type_schema_fieldtype',
    nextStatement: 'type_schema_fieldtype',
    colour: Colors.SchemaFieldTypeArray,
    tooltip: 'Array Field Type',
    helpUrl: ''
  },
  Code: function (block) {
    const nextTest = Blockly.JavaScript.valueToCode(block, 'nextTest', Blockly.JavaScript.ORDER_MEMBER)

    const items = []

    let currentItem = block.getInputTargetBlock('items')

    while (currentItem) {
      var itemCode = getCodeForSingleBlock(currentItem)
      items.push(itemCode)
      currentItem = currentItem.getNextBlock()
    }

    if (items.length > 0) {
      if (nextTest) {
        return `Joi.array().items(
        ${items.join(`,
        `)}
      ).${nextTest}`
      } else {
        return `Joi.array().items(
        ${items.join(`,
        `)}
      )`
      }
    } else {
      if (nextTest) {
        return `Joi.array().${nextTest}`
      } else {
        return 'Joi.array()'
      }
    }
  }
}
