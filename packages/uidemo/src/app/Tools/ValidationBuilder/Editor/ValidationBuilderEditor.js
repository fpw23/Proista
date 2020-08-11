import React from 'react'
import { BlocklyEditor } from '@proista/client-ui-blockly/lib/index'
import { RegisterBlocks } from './Blocks'
import { BuildToolBoxConfig } from './ToolBox'

export class ValidationBuilderEditor extends React.Component {
  render () {
    const { onChange, dimensions, designXML, containerId } = this.props

    return <BlocklyEditor
      RegisterBlocks={RegisterBlocks}
      BuildToolBoxConfig={BuildToolBoxConfig}
      RootBlock={{
        Name: 'root_schemaanchor'
      }}
      NoOrphans
      onChange={onChange}
      dimensions={dimensions}
      designXML={designXML}
      containerId={containerId}
    />
  }
}
