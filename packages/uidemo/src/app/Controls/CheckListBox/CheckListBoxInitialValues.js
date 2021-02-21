import React from 'react'
import { FormBox, CheckListBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes } from '@proista/client-ui-material/lib/Controls/Core/index'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import propSchema from './CheckListBoxInitialValuesProps.json'
import { PropExplorer } from '../PropExplorer'

const styles = (theme) => ({
  root: {
    width: '100%'
  }
})

const options = []
options.push({ Text: 'Option 1', Value: '1' })
options.push({ Text: 'Option 2', Value: '2' })
options.push({ Text: 'Option 3', Value: '3' })
options.push({ Text: 'Option 4', Value: '4' })

export class CheckListBoxInitialValuesPlain extends React.Component {
  render () {
    const { classes } = this.props
    return <React.Fragment>
      <PropExplorer propSchema={propSchema}>
        {({ formbox = {} }) => {
          return <div className={classes.root}>
            <FormBox {...formbox} initialValues={{ Stacked: ['1', '3'], Inline: ['2', '4'] }} form='Test_CheckListBoxInitialValues' onSubmit={(values) => { console.log(values) }}>
              <Row>
                <CheckListBox name='Stacked' label='Stacked' options={options} layout={LayoutSizes.Full} />
              </Row>
              <Row>
                <CheckListBox name='Inline' inline label='Inline' options={options} layout={LayoutSizes.Full} />
              </Row>
            </FormBox>
          </div>
        }}
      </PropExplorer>
    </React.Fragment>
  }
}

export const InitialValues = compose(
  withStyles(styles)
)(CheckListBoxInitialValuesPlain)

export default InitialValues