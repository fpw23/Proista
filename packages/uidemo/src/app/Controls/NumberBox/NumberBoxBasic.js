import React from 'react'
import { FormBox, NumberBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes } from '@proista/client-ui-material/lib/Controls/Core/index'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import propSchema from './NumberBoxBasicProps.json'
import { PropExplorer } from '../PropExplorer'

const styles = (theme) => ({
  root: {
    width: '100%'
  }
})

export class NumberBoxBasicPlain extends React.Component {
  render () {
    const { classes } = this.props
    return <React.Fragment>
      <PropExplorer propSchema={propSchema}>
        {({ formbox = {} }) => {
          return <div className={classes.root}>
            <FormBox {...formbox} form='Test_NumberBoxBasic'>
              <Row>
                <NumberBox name='Plain' label='Plain' layout={LayoutSizes.Half} />
                <NumberBox name='Currency' label='Currency' type='currency' layout={LayoutSizes.Half} />
                <NumberBox name='CurrencyCents' label='Currency with Cents' type='currencyWithCents' layout={LayoutSizes.Half} />
                <NumberBox name='IPPort' label='IP Port (custom)' type='custom' customFormat={{
                  thousandSeparator: null,
                  decimalScale: 0
                }} layout={LayoutSizes.Half} />
              </Row>
            </FormBox>
          </div>
        }}
      </PropExplorer>
    </React.Fragment>
  }
}

export const NumberBoxBasic = compose(
  withStyles(styles)
)(NumberBoxBasicPlain)

export default NumberBoxBasic
