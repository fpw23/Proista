import { Colors } from './Colors'

export const RootRunCode = {
  Name: 'root_runcode',
  Def: {
    type: 'root_runcode',
    message0: 'Run Code',
    nextStatement: null,
    colour: Colors.Root,
    tooltip: '',
    helpUrl: ''
  },
  Code: function (block) {
    return `// Run this code
    `
  }
}
