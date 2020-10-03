import React from 'react'
import { FormBox, DateTimeBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes } from '@proista/client-ui-material/lib/Controls/Core/index'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import propSchema from './DateBoxWithTimeProps.json'
import { PropExplorer } from '../PropExplorer'

const styles = (theme) => ({
  root: {
    width: '100%'
  }
})

export class DateBoxWithTimePlain extends React.Component {
  render () {
    const { classes } = this.props
    return <React.Fragment>
      <PropExplorer propSchema={propSchema}>
        {({ formbox = {}, datebox = {} }) => {
          return <div className={classes.root}>
            <FormBox {...formbox} form='Test_DateBoxWithTime' onSubmit={(values) => { console.log(values) }}>
              <Row>
                <DateTimeBox {...datebox} name='DeskTop' label='Desktop' layout={LayoutSizes.Half} />
                <DateTimeBox {...datebox} name='Mobile' label='Mobile' displayMode='mobile' layout={LayoutSizes.Half} />
              </Row>
            </FormBox>
          </div>
        }}
      </PropExplorer>
    </React.Fragment>
  }
}

export const DateBoxWithTime = compose(
  withStyles(styles)
)(DateBoxWithTimePlain)

export default DateBoxWithTime
