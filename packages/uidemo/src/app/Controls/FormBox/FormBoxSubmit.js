import React from 'react'
import { FormBox, TextBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes, Button, DrawerChannels, DrawerStandardStyles } from '@proista/client-ui-material/lib/Controls/Core/index'
import { SendBusMessage } from '@proista/client/lib/Tools/index'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { ah as FActions, sh as FStates } from '@proista/client/lib/Data/Form/Types'
import { compose } from '@proista/client-tools/lib/index'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import propSchema from './FormBoxSubmitProps.json'
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

const formName = 'Test_FormBoxSubmit'

export class FormBoxSubmitPlain extends React.Component {
  componentDidMount () {
    const { FormInitValues } = this.props
    FormInitValues(formName, {
      Value1: 'Test 1',
      Value2: 'Test 2'
    })
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
        {({ formbox = {} }) => {
          return <div className={classes.root}>
            <FormBox {...formbox} form={formName} onSubmit={this.onSubmit}>
              <Row>
                <TextBox name='Value1' label='Value 1' caption='This is the caption' layout={LayoutSizes.Half} />
                <TextBox name='Value2' label='Value 2' layout={LayoutSizes.Half} />
                <TextBox name='Value3' label='Value 3' layout={LayoutSizes.Full} />
              </Row>
            </FormBox>
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

export const FormBoxSubmit = compose(
  withStyles(styles),
  WithRedux(
    [FStates.Data(formName)],
    [FActions.Submit, FActions.InitValues]
  )
)(FormBoxSubmitPlain)

export default FormBoxSubmit
