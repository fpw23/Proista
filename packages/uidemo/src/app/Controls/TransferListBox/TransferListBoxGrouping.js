import React from 'react'
import { FormBox, TransferListBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes } from '@proista/client-ui-material/lib/Controls/Core/index'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import propSchema from './TransferListBoxGroupingProps.json'
import { PropExplorer } from '../PropExplorer'

const styles = (theme) => ({
  root: {
    width: '100%'
  }
})

const options = [
  { Text: 'ABC', Value: '123', ExtraData: { GroupBy: 'Part 1' } },
  { Text: 'DEF', Value: '456', ExtraData: { GroupBy: 'Part 1' } },
  { Text: 'GHI', Value: '789', ExtraData: { GroupBy: 'Part 1' } },
  { Text: 'JKL', Value: '012', ExtraData: { GroupBy: 'Part 2' } },
  { Text: 'MNP', Value: '345', ExtraData: { GroupBy: 'Part 2' } },
  { Text: 'OPQ', Value: '678', ExtraData: { GroupBy: 'Part 3' } },
  { Text: 'RST', Value: '901', ExtraData: { GroupBy: 'Part 3' } },
  { Text: 'UVW', Value: '234', ExtraData: { GroupBy: 'Part 3' } },
  { Text: 'XYZ', Value: '567', ExtraData: { GroupBy: 'Part 4' } }
]

export class TransferListBoxGroupingPlain extends React.Component {
  render () {
    const { classes } = this.props
    return <React.Fragment>
      <PropExplorer propSchema={propSchema}>
        {({ formbox = {} }) => {
          return <div className={classes.root}>
            <FormBox {...formbox} initialValues={{ ListItems: [] }} form='Test_TransferListBoxGrouping' onSubmit={(values) => { console.log(values) }}>
              <Row>
                <TransferListBox name='ListItems' groupProp='ExtraData.GroupBy' options={options} layout={LayoutSizes.Full} label='Grouping' />
              </Row>
            </FormBox>
          </div>
        }}
      </PropExplorer>
    </React.Fragment>
  }
}

export const Grouping = compose(
  withStyles(styles)
)(TransferListBoxGroupingPlain)

export default Grouping
