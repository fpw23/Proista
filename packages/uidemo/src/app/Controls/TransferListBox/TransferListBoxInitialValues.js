import React from 'react'
import { FormBox, TransferListBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes } from '@proista/client-ui-material/lib/Controls/Core/index'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import propSchema from './TransferListBoxInitialValuesProps.json'
import { PropExplorer } from '../PropExplorer'

const styles = (theme) => ({
  root: {
    width: '100%'
  }
})

export class TransferListBoxInitialValuesPlain extends React.Component {
  render () {
    const { classes } = this.props
    return <React.Fragment>
      <PropExplorer propSchema={propSchema}>
        {({ formbox = {} }) => {
          return <div className={classes.root}>
            <FormBox {...formbox} initialValues={{ ListItems: ['456', '012'] }} form='Test_TransferListBoxInitialValues' onSubmit={(values) => { console.log(values) }}>
              <Row>
                <TransferListBox name='ListItems' options={[{ Text: 'ABC', Value: '123' }, { Text: 'DEF', Value: '456' }, { Text: 'GHI', Value: '789' }, { Text: 'JKL', Value: '012' }]} layout={LayoutSizes.Full} label='Initial Values' />
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
)(TransferListBoxInitialValuesPlain)

export default InitialValues
