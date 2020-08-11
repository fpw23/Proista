import React from 'react'
import { FormBox, ComboBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes } from '@proista/client-ui-material/lib/Controls/Core/index'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import propSchema from './ComboBoxBasicProps.json'
import { PropExplorer } from '../PropExplorer'

const styles = (theme) => ({
  root: {
    width: '100%'
  }
})

export class ComboBoxBasicPlain extends React.Component {
  render () {
    const { classes } = this.props
    return <React.Fragment>
      <PropExplorer propSchema={propSchema}>
        {({ formbox = {} }) => {
          const options = []
          options.push({ Text: 'Option 1', Value: '1' })
          options.push({ Text: 'Option 2', Value: '2' })
          options.push({ Text: 'Option 3', Value: '3' })
          options.push({ Text: 'Option 4', Value: '4' })

          return <div className={classes.root}>
            <FormBox {...formbox} form='Test_ComboBoxBasic'>
              <Row>
                <ComboBox options={options} name='Plain' label='Plain' layout={LayoutSizes.Half} />
                <ComboBox name='NoOptions' label='No Options' layout={LayoutSizes.Half} />
                <ComboBox options={options} autosetFirstOption name='AutoSetOptions' label='Autoset First Options' layout={LayoutSizes.Half} />
              </Row>
            </FormBox>
          </div>
        }}
      </PropExplorer>
    </React.Fragment>
  }
}

export const ComboBoxBasic = compose(
  withStyles(styles)
)(ComboBoxBasicPlain)

export default ComboBoxBasic
