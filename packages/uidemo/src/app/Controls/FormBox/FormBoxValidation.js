import React from 'react'
import { FormBox, TextBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes, Button } from '@proista/client-ui-material/lib/Controls/Core/index'
import { convertMessageErrorsToFormErrors } from '@proista/client/lib/Tools/index'
import { withStyles } from '@material-ui/core/styles'
import { ah as FActions, sh as FState } from '@proista/client/lib/Data/Form/Types'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { compose } from '@proista/client-tools/lib/index'
import propSchema from './FormBoxValidationProps.json'
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

const formName = 'Test_FormBoxValidation'

export class FormBoxValidationPlain extends React.Component {
  onSetValidation = () => {
    const { FormSetValidation } = this.props
    const results = convertMessageErrorsToFormErrors([
      { Type: 'Rule', Message: '"Value 1" is required', Field: 'Value1' },
      { Type: 'Rule', Message: 'Value 2 is required', Field: 'Value2' },
      { Type: 'Rule', Message: 'Value 3 is required', Field: 'Value3' }
    ])
    FormSetValidation(formName, results.errors, results.fieldNames)
  }

  onClearValidation = () => {
    const { FormClearValidation } = this.props
    FormClearValidation(formName)
  }

  render () {
    const { classes } = this.props
    return <React.Fragment>
      <PropExplorer propSchema={propSchema}>
        {({ formbox = {} }) => {
          return <div className={classes.root}>
            <FormBox {...formbox} form={formName} onSubmit={(values) => { console.log(values) }}>
              <Row>
                <TextBox name='Value1' label='Value 1' caption='This is the caption' layout={LayoutSizes.Half} />
                <TextBox name='Value2' label='Value 2' layout={LayoutSizes.Half} />
                <TextBox name='Value3' label='Value 3' layout={LayoutSizes.Full} />
              </Row>
            </FormBox>
            <div className={classes.actions}>
              <Button variant="contained" color="primary" onClick={this.onSetValidation}>
                Set Failed Validation
              </Button>
              <Button variant="contained" onClick={this.onClearValidation}>
                Clear Validation
              </Button>
            </div>
          </div>
        }}
      </PropExplorer>
    </React.Fragment>
  }
}

export const FormBoxValidation = compose(
  withStyles(styles),
  WithRedux(
    [FState.Data(formName)],
    [FActions.SetValidation, FActions.ClearValidation]
  )
)(FormBoxValidationPlain)

export default FormBoxValidation
