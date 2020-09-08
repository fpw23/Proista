import React from 'react'
import { FormBox, ComboBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes } from '@proista/client-ui-material/lib/Controls/Core/index'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import propSchema from './ComboBoxGroupingProps.json'
import { PropExplorer } from '../PropExplorer'

const styles = (theme) => ({
  root: {
    width: '100%'
  }
})

export class ComboBoxGroupingPlain extends React.Component {
  render () {
    const { classes } = this.props
    return <React.Fragment>
      <PropExplorer propSchema={propSchema}>
        {({ formbox = {} }) => {
          const options = []
          options.push({ Text: 'Option 1', Value: '1', ExtraData: { GroupBy: 'Part 1' } })
          options.push({ Text: 'Option 2', Value: '2', ExtraData: { GroupBy: 'Part 1' } })
          options.push({ Text: 'Option 3', Value: '3', ExtraData: { GroupBy: 'Part 2' } })
          options.push({ Text: 'Option 4', Value: '4', ExtraData: { GroupBy: 'Part 2' } })
          options.push({ Text: 'Option 5', Value: '5', ExtraData: { GroupBy: 'Part 3' } })
          options.push({ Text: 'Option 6', Value: '6', ExtraData: { GroupBy: 'Part 3' } })
          options.push({ Text: 'Option 7', Value: '7', ExtraData: { GroupBy: 'Part 3' } })

          return <div className={classes.root}>
            <FormBox {...formbox} form='Test_ComboBoxGrouping' onSubmit={(values) => { console.log(values) }}>
              <Row>
                <ComboBox options={options} name='Grouping' groupProp='ExtraData.GroupBy' label='With Option Groups' layout={LayoutSizes.Half} />
              </Row>
            </FormBox>
          </div>
        }}
      </PropExplorer>
    </React.Fragment>
  }
}

export const ComboBoxGrouping = compose(
  withStyles(styles)
)(ComboBoxGroupingPlain)

export default ComboBoxGrouping
