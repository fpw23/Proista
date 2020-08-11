import Blockly from 'blockly'
import { Colors } from './Colors'

export const LogicDate = {
  Name: 'logic_date',
  Def: {
    type: 'logic_date',
    message0: 'Date %1 %2 %3 %4',
    args0: [
      {
        type: 'input_value',
        name: 'Date1',
        check: ['type_date', 'type_formdata_field']
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
            'Is Date',
            '^'
          ]
        ]
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'input_value',
        name: 'Date2',
        check: ['type_date', 'type_formdata_field']
      }
    ],
    output: 'Boolean',
    colour: Colors.Logic,
    tooltip: 'Tests a date',
    helpUrl: '',
    mutator: 'logic_date_mutator'
  },
  Code: function (block) {
    const op = block.getFieldValue('Operator')
    const date1 = Blockly.JavaScript.valueToCode(block, 'Date1', Blockly.JavaScript.ORDER_ATOMIC) || '0'

    let code = ''
    if (op === '^') {
      code = `moment.isDate(${date1}) || moment.isMoment(${date1})`
    } else {
      const date2 = Blockly.JavaScript.valueToCode(block, 'Date2', Blockly.JavaScript.ORDER_ATOMIC) || '0'
      switch (op) {
        case '===':
          code = `moment(${date1}).isSame(${date2}) === true`
          break
        case '!==':
          code = `moment(${date1}).isSame(${date2}) === false`
          break
        case '<=':
          code = `moment(${date1}).isSameOrBefore(${date2}) === true`
          break
        case '<':
          code = `moment(${date1}).isBefore(${date2}) === true`
          break
        case '>=':
          code = `moment(${date1}).isSameOrAfter(${date2}) === true`
          break
        case '>':
          code = `moment(${date1}).isAfter(${date2}) === true`
          break
      }
    }
    return [code, Blockly.JavaScript.ORDER_NONE]
  },
  Mutators: [
    ['logic_date_mutator', {
      Mixin: {
        mutationToDom: function () {
          var container = Blockly.utils.xml.createElement('mutation')
          var op = this.getFieldValue('Operator')
          var showDate2 = (op !== '^')
          container.setAttribute('showDate2', showDate2)
          return container
        },
        domToMutation: function (xmlElement) {
          var showDate2 = (xmlElement.getAttribute('showDate2') === 'true')
          this.updateShape_(showDate2)
        },
        updateShape_: function (showDate2) {
          var inputExists = this.getInput('Date2')
          if (showDate2) {
            if (!inputExists) {
              this.appendValueInput('Date2')
                .setCheck('type_date')
            }
          } else if (inputExists) {
            this.removeInput('Date2')
          }
        }
      },
      Extension: function () {
        this.getField('Operator').setValidator(function (option) {
          var showDate2 = (option !== '^')
          this.getSourceBlock().updateShape_(showDate2)
        })
      }

    }]
  ]
}
