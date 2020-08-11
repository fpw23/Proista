import Blockly from 'blockly'
import { Colors } from './Colors'

export const LogicText = {
  Name: 'logic_text',
  Def: {
    type: 'logic_text',
    message0: 'Text %1 %2 %3 %4',
    args0: [
      {
        type: 'input_value',
        name: 'Text1',
        check: ['type_text', 'type_formdata_field']
      },
      {
        type: 'field_dropdown',
        name: 'Operator',
        options: [
          [
            'Is Equal',
            '==='
          ],
          [
            'Is Not Equal',
            '!=='
          ],
          [
            'Starts With',
            'sw'
          ],
          [
            'Ends With',
            'ew'
          ],
          [
            'Contains',
            'con'
          ],
          [
            'Is Text',
            '^'
          ],
          [
            'Is Empty',
            '*'
          ]
        ]
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'input_value',
        name: 'Text2',
        check: ['type_text', 'type_formdata_field']
      }
    ],
    output: 'Boolean',
    colour: Colors.Logic,
    tooltip: 'Test Text Strings',
    helpUrl: '',
    mutator: 'logic_text_mutator'
  },
  Code: function (block) {
    const op = block.getFieldValue('Operator')
    const txt1 = Blockly.JavaScript.valueToCode(block, 'Text1', Blockly.JavaScript.ORDER_ATOMIC) || '0'

    let code = ''
    if (op === '^') {
      code = `_.isString(${txt1})`
    } else {
      const txt2 = Blockly.JavaScript.valueToCode(block, 'Text2', Blockly.JavaScript.ORDER_ATOMIC) || '0'
      switch (op) {
        case '===':
          code = `_.toLower(${txt1}) === _.toLower(${txt2})`
          break
        case '!==':
          code = `_.toLower(${txt1}) !== _.toLower(${txt2})`
          break
        case 'sw':
          code = `_.startsWith(_.toLower(${txt1}), _.toLower(${txt2}))`
          break
        case 'ew':
          code = `_.endsWith(_.toLower(${txt1}), _.toLower(${txt2}))`
          break
        case 'con':
          code = `_.includes(_.toLower(${txt1}), _.toLower(${txt2}))`
          break
        case '*':
          code = `(${txt1} || '').trim === ''`
          break
      }
    }
    return [code, Blockly.JavaScript.ORDER_NONE]
  },
  Mutators: [
    ['logic_text_mutator', {
      Mixin: {
        mutationToDom: function () {
          var container = Blockly.utils.xml.createElement('mutation')
          var op = this.getFieldValue('Operator')
          var showText2 = (op !== '^') & (op !== '*')
          container.setAttribute('showText2', showText2)
          return container
        },
        domToMutation: function (xmlElement) {
          var showText2 = (xmlElement.getAttribute('showText2') === 'true')
          this.updateShape_(showText2)
        },
        updateShape_: function (showText2) {
          var inputExists = this.getInput('Text2')
          if (showText2) {
            if (!inputExists) {
              this.appendValueInput('Text2')
                .setCheck('type_text')
            }
          } else if (inputExists) {
            this.removeInput('Text2')
          }
        }
      },
      Extension: function () {
        this.getField('Operator').setValidator(function (option) {
          var showText2 = (option !== '^') & (option !== '*')
          this.getSourceBlock().updateShape_(showText2)
        })
      }

    }]
  ]
}
