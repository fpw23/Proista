import React from 'react'
import { FormBox, TextBox, FormBoxHeader as FBH } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes } from '@proista/client-ui-material/lib/Controls/Core/index'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import propSchema from './FormBoxHeaderProps.json'
import { PropExplorer } from '../PropExplorer'

const styles = (theme) => ({
  root: {
    width: '100%'
  }
})

const formName = 'Test_FormBoxHeader'

export class FormBoxHeaderPlain extends React.Component {
  render () {
    const { classes } = this.props
    return <React.Fragment>
      <PropExplorer propSchema={propSchema}>
        {({ formboxheader1 = {}, formboxheader2 = {} }) => {
          return <div className={classes.root}>
            <FormBox form={formName} onSubmit={(values) => { console.log(values) }}>
              <FBH {...formboxheader1}></FBH>
              <Row>
                <TextBox name='Value1' label='Value 1' layout={LayoutSizes.Half} />
              </Row>
              <FBH {...formboxheader2}></FBH>
              <Row>
                <TextBox name='Value2' label='Value 2' layout={LayoutSizes.Half} />
                <TextBox name='Value3' label='Value 3' layout={LayoutSizes.Half} />
              </Row>
            </FormBox>
          </div>
        }}
      </PropExplorer>
    </React.Fragment>
  }
}

export const FormBoxHeader = compose(
  withStyles(styles)
)(FormBoxHeaderPlain)

export default FormBoxHeader
