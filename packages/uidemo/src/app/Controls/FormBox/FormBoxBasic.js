import React from 'react'
import { FormBox, TextBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes } from '@proista/client-ui-material/lib/Controls/Core/index'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import propSchema from './FormBoxBasicProps.json'
import { PropExplorer } from '../PropExplorer'

const styles = (theme) => ({
  root: {
    width: '100%'
  }
})

const formName = 'Test_FormBoxBasic'

export class FormBoxBasicPlain extends React.Component {
  render () {
    console.log('FormBox')
    console.log(FormBox)
    const { classes } = this.props
    return <React.Fragment>
      <PropExplorer propSchema={propSchema}>
        {({ formbox = {} }) => {
          return <div className={classes.root}>
            <FormBox {...formbox} form={formName}>
              <Row>
                <TextBox name='Value1' label='Value 1' layout={LayoutSizes.Half} />
              </Row>
            </FormBox>
          </div>
        }}
      </PropExplorer>
    </React.Fragment>
  }
}

export const FormBoxBasic = compose(
  withStyles(styles)
)(FormBoxBasicPlain)

export default FormBoxBasic
