import Blockly from 'blockly'
import { Colors } from './Colors'

export const LogicNumber = {
  Name: 'logic_number',
  Def: {
    type: 'logic_number',
    message0: 'Number %1 %2 %3 %4',
    args0: [
      {
        type: 'input_value',
        name: 'Number1',
        check: ['type_number', 'type_formdata_field']
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
            'Is Less Than Or Equal',
            '<='
          ],
          [
            'Is Less Than',
            '<'
          ],
          [
            'Is Greater Than Or Equal',
            '>='
          ],
          [
            'Is Greater Than',
            '>'
          ],
          [
            'Is Number',
            '^'
          ]
        ]
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'input_value',
        name: 'Number2',
        check: ['type_number', 'type_formdata_field']
      }
    ],
    output: 'Boolean',
    colour: Colors.Logic,
    tooltip: 'Test Numbers',
    helpUrl: '',
    mutator: 'logic_number_mutator'
  },
  Code: function (block) {
    const op = block.getFieldValue('Operator')
    const number1 = Blockly.JavaScript.valueToCode(block, 'Number1', Blockly.JavaScript.ORDER_ATOMIC) || '0'

    let code = ''
    if (op === '^') {
      code = `_.isNumber(${number1})`
    } else {
      const number2 = Blockly.JavaScript.valueToCode(block, 'Number2', Blockly.JavaScript.ORDER_ATOMIC) || '0'
      code = `parseInt(${number1}) ${op} parseInt(${number2})`
    }
    return [code, Blockly.JavaScript.ORDER_NONE]
  },
  Mutators: [
    ['logic_number_mutator', {
      Mixin: {
        mutationToDom: function () {
          var container = Blockly.utils.xml.createElement('mutation')
          var op = this.getFieldValue('Operator')
          var showNumber2 = (op !== '^')
          container.setAttribute('showNumber2', showNumber2)
          return container
        },
        domToMutation: function (xmlElement) {
          var showNumber2 = (xmlElement.getAttribute('showNumber2') === 'true')
          this.updateShape_(showNumber2)
        },
        updateShape_: function (showNumber2) {
          var inputExists = this.getInput('Number2')
          if (showNumber2) {
            if (!inputExists) {
              this.appendValueInput('Number2')
                .setCheck('type_number')
            }
          } else if (inputExists) {
            this.removeInput('Number2')
          }
        }
      },
      Extension: function () {
        this.getField('Operator').setValidator(function (option) {
          var showNumber2 = (option !== '^')
          this.getSourceBlock().updateShape_(showNumber2)
        })
      }

    }]
  ]
}
