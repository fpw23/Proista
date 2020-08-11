import React from 'react'
import { FormBox, CheckBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes } from '@proista/client-ui-material/lib/Controls/Core/index'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import propSchema from './CheckBoxBasicProps.json'
import { PropExplorer } from '../PropExplorer'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

const styles = (theme) => ({
  root: {
    width: '100%'
  }
})

export class CheckBoxBasicPlain extends React.Component {
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
            <FormBox {...formbox} form='Test_CheckBoxBasic'>
              <Row>
                <CheckBox name='Plain' label='Plain' text='Check Me' layout={LayoutSizes.Half} />
                <CheckBox name='NoLable' text='With No Label' layout={LayoutSizes.Half} />
                <CheckBox name='CustomIcon' text='Check Me' icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon />} label='Custom Icons' layout={LayoutSizes.Half} />
              </Row>
            </FormBox>
          </div>
        }}
      </PropExplorer>
    </React.Fragment>
  }
}

export const CheckBoxBasic = compose(
  withStyles(styles)
)(CheckBoxBasicPlain)

export default CheckBoxBasic
