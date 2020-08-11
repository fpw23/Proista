import React from 'react'
import { Button, DrawerChannels } from '@proista/client-ui-material/lib/Controls/Core/index'
import { compose } from '@proista/client-tools/lib/index'
import { withStyles } from '@material-ui/core/styles'
import { SendBusMessage } from '@proista/client/lib/Tools/index'
import { FormBuilder } from './FormBuilder/FormBuilder'
import { ValidationBuilder } from './ValidationBuilder/ValidationBuilder'

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: theme.spacing(3)
  }
})

export class ToolsPlain extends React.Component {
  componentDidMount () {
    console.log('Register Tool Forms')
    SendBusMessage(DrawerChannels.NewRegister({ key: 'UITests.Tools.FormBuilder', component: FormBuilder }))
    SendBusMessage(DrawerChannels.NewRegister({ key: 'UITests.Tools.ValidationBuilder', component: ValidationBuilder }))
  }

  componentWillUnmount () {
    console.log('Unregister Tool Forms')
    SendBusMessage(DrawerChannels.NewUnregister({ key: 'UITests.Tools.FormBuilder' }))
    SendBusMessage(DrawerChannels.NewUnregister({ key: 'UITests.Tools.ValidationBuilder' }))
  }

  onClick = (action) => {
    switch (action) {
      case 'FormBuilder':
        SendBusMessage(DrawerChannels.NewShow({ key: 'UITests.Tools.FormBuilder' }))
        break
      case 'ValidationBuilder':
        SendBusMessage(DrawerChannels.NewShow({ key: 'UITests.Tools.ValidationBuilder' }))
        break
    }
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <h2>Tools</h2>
        <div className={classes.actions}>
          <Button variant="contained" color="secondary" onClick={() => { this.onClick('FormBuilder') }}>
              Form Builder
          </Button>
          <Button variant="contained" color="secondary" onClick={() => { this.onClick('ValidationBuilder') }}>
              Validation Builder
          </Button>
          <Button variant="contained" color="secondary" onClick={() => { this.onClick('ScriptBuilder') }}>
              Script Builder
          </Button>
          <Button variant="contained" color="secondary" onClick={() => { this.onClick('TemplateBuilder') }}>
              Template Builder
          </Button>
        </div>
      </div>
    )
  }
}

export const Tools = compose(
  withStyles(styles)
)(ToolsPlain)
