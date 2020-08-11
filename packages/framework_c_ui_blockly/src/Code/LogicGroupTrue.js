import Blockly from 'blockly'
import { Colors } from './Colors'
import _ from 'lodash'

export const LogicGroupTrue = {
  Name: 'logic_group_true',
  Def: {
    type: 'logic_group_true',
    message0: '%1 %2 %3 Are True %4 %5 %6',
    args0: [
      {
        type: 'field_dropdown',
        name: 'TestType',
        options: [
          [
            'Any Of',
            'Any'
          ],
          [
            'All Of',
            'All'
          ],
          [
            'None Of',
            'None'
          ]
        ]
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'field_dropdown',
        name: 'TestCount',
        options: [
          [
            'These 2',
            '2'
          ],
          [
            'These 3',
            '3'
          ],
          [
            'These 4',
            '4'
          ],
          [
            'These 5',
            '5'
          ],
          [
            'These 6',
            '6'
          ],
          [
            'These 7',
            '7'
          ],
          [
            'These 8',
            '8'
          ],
          [
            'These 9',
            '9'
          ],
          [
            'These 10',
            '10'
          ]
        ]
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'input_value',
        name: 'Test1',
        check: 'Boolean'
      },
      {
        type: 'input_value',
        name: 'Test2',
        check: 'Boolean'
      }
    ],
    output: 'Boolean',
    colour: Colors.Logic,
    tooltip: 'Tests if a group of results is true',
    helpUrl: '',
    mutator: 'logic_group_true_mutator'
  },
  Code: function (block) {
    const testType = block.getFieldValue('TestType')
    const testCount = parseInt(block.getFieldValue('TestCount')) || 2

    let x = 1
    const tests = []
    for (x = 1; x <= testCount; x++) {
      const currentTest = Blockly.JavaScript.valueToCode(block, `Test${x}`, Blockly.JavaScript.ORDER_ATOMIC) || (testType === 'None' ? 'true' : 'false')
      tests.push(currentTest)
    }

    let code = ''
    switch (testType) {
      case 'Any':
        code = _.join(_.map(tests, (t) => { return `${t} === true` }), ' || ')
        break
      case 'All':
        code = _.join(_.map(tests, (t) => { return `${t} === true` }), ' && ')
        break
      case 'None':
        code = _.join(_.map(tests, (t) => { return `${t} === false` }), ' && ')
        break
    }
    return [code, Blockly.JavaScript.ORDER_ADDITION]
  },
  Mutators: [
    ['logic_group_true_mutator', {
      Mixin: {
        mutationToDom: function () {
          var container = Blockly.utils.xml.createElement('mutation')
          return container
        },
        domToMutation: function (xmlElement) {
          var testCount = parseInt(xmlElement.getAttribute('TestCount')) || 2
          this.updateShape_(testCount)
        },
        updateShape_: function (testCount) {
          var x = 1
          for (x = 1; x <= 10; x++) {
            var inputExists = this.getInput(`Test${x}`)
            if (x <= testCount) {
              if (!inputExists) {
                this.appendValueInput(`Test${x}`)
                  .setCheck('Boolean')
              }
            } else {
              if (inputExists) {
                this.removeInput(`Test${x}`)
              }
            }
          }
        }
      },
      Extension: function () {
        this.getField('TestCount').setValidator(function (option) {
          var testCount = parseInt(option) || 2
          this.getSourceBlock().updateShape_(testCount)
        })
      }
    }]
  ]
}
