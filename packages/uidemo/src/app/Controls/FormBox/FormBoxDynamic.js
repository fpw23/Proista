import React from 'react'
import { DynamicFormBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Button, DrawerChannels, DrawerStandardStyles } from '@proista/client-ui-material/lib/Controls/Core/index'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { SendBusMessage } from '@proista/client/lib/Tools/index'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { compose } from '@proista/client-tools/lib/index'
import { ah as FActions } from '@proista/client/lib/Data/Form/Types'
import propSchema from './FormBoxDynamicProps.json'
import { PropExplorer } from '../PropExplorer'

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

const DrawerResulstStyles = makeStyles({
  ...DrawerStandardStyles
})

const DrawerResultsBody = (props) => {
  const classes = DrawerResulstStyles()
  return <React.Fragment>
    <div className={classes.VHalf}>
      <h2>Form Submit Values</h2>
      <p>{props.BodyText}</p>
      <Button variant="contained" color="primary" onClick={props.close}>Close</Button>
    </div>
  </React.Fragment>
}

const formName = 'Test_FormBoxDynamic'

export class FormBoxDynamicPlain extends React.Component {
  componentDidMount () {
    SendBusMessage(DrawerChannels.NewRegister({ key: 'UITests.DrawResultsBody', component: DrawerResultsBody }))
  }

  componentWillUnmount () {
    SendBusMessage(DrawerChannels.NewUnregister({ key: 'UITests.DrawResultsBody' }))
  }

  onSubmit = (values) => {
    SendBusMessage(DrawerChannels.NewShow({ key: 'UITests.DrawResultsBody', props: { BodyText: JSON.stringify(values, null, 4) }, anchor: 'top' }))
  }

  render () {
    const { classes, FormSubmit } = this.props
    return <React.Fragment>
      <PropExplorer propSchema={propSchema}>
        {({ formbox = {}, definition = '[]' }) => {
          return <div className={classes.root}>
            <DynamicFormBox {...formbox} definition={definition} onSubmit={this.onSubmit} form={formName} />
            <div className={classes.actions}>
              <Button variant="contained" color="primary" onClick={() => { FormSubmit(formName) }}>
                Submit
              </Button>
            </div>
          </div>
        }}
      </PropExplorer>
    </React.Fragment>
  }
}

export const FormBoxDynamic = compose(
  withStyles(styles),
  WithRedux(
    [],
    [FActions.Submit]
  )
)(FormBoxDynamicPlain)

export default FormBoxDynamic
