import React from 'react'
import { FormBox, ComboBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes } from '@proista/client-ui-material/lib/Controls/Core/index'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import propSchema from './ComboBoxFiltersInitialValuesProps.json'
import { PropExplorer } from '../PropExplorer'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { sh as FStates, ah as FActions } from '@proista/client/lib/Data/Form/Types'

const styles = (theme) => ({
  root: {
    width: '100%'
  }
})

const aOptions = []
aOptions.push({ Text: 'Option A 1', Value: 'A1' })
aOptions.push({ Text: 'Option A 2', Value: 'A2' })
aOptions.push({ Text: 'Option A 3', Value: 'A3' })
aOptions.push({ Text: 'Option A 4', Value: 'A4' })

const bOptions = []
bOptions.push({ Text: 'Option B 1', Value: 'B1', ParentValue: 'A1' })
bOptions.push({ Text: 'Option B 2', Value: 'B2', ParentValue: 'A1' })
bOptions.push({ Text: 'Option B 3', Value: 'B3', ParentValue: 'A2' })
bOptions.push({ Text: 'Option B 4', Value: 'B4', ParentValue: 'A3' })

const cOptions = []
cOptions.push({ Text: 'Option C 1', Value: 'C1', ParentValue: 'B1' })
cOptions.push({ Text: 'Option C 2', Value: 'C2', ParentValue: 'B1' })
cOptions.push({ Text: 'Option C 3', Value: 'C3', ParentValue: 'B2' })
cOptions.push({ Text: 'Option C 4', Value: 'C4', ParentValue: 'B3' })

export class ComboBoxFiltersInitialValuesPlain extends React.Component {
  componentDidMount () {
    const { FormInitValues } = this.props
    FormInitValues('Test_ComboBoxFiltersInitialValues', { aValue: 'A1', bValue: 'B2', cValue: 'C3' })
  }

  render () {
    const { classes, FormData } = this.props
    return <React.Fragment>
      <PropExplorer propSchema={propSchema}>
        {({ formbox = {} }) => {
          return <div className={classes.root}>
            <FormBox {...formbox} form='Test_ComboBoxFiltersInitialValues' onSubmit={(values) => { console.log(values) }}>
              <Row>
                <ComboBox options={aOptions} name='aValue' label='A Value' layout={LayoutSizes.Half} />
                <ComboBox options={bOptions} name='bValue' label='B Value' filterValue={{ ParentValue: FormData.aValue }} layout={LayoutSizes.Half} />
                <ComboBox options={cOptions} name='cValue' label='C Value' filterValue={{ ParentValue: FormData.bValue }} layout={LayoutSizes.Half} />
              </Row>
            </FormBox>
          </div>
        }}
      </PropExplorer>
    </React.Fragment>
  }
}

export const ComboBoxFiltersInitialValues = compose(
  withStyles(styles),
  WithRedux([FStates.Data('Test_ComboBoxFiltersInitialValues')], [FActions.InitValues])
)(ComboBoxFiltersInitialValuesPlain)

export default ComboBoxFiltersInitialValues
