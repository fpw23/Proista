import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import { Button } from '@proista/client-ui-material/lib/Controls/Core/index'
import propSchema from './ButtonBasicProps.json'
import { PropExplorer } from '../PropExplorer'

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: theme.spacing(3)
  }
})

export class ButtonBasicPlain extends React.Component {
  render () {
    const { classes } = this.props
    return <React.Fragment>
      <PropExplorer propSchema={propSchema}>
        {({ buttonProps1 = {}, buttonProps2 = {} }) => {
          const { text: text1, ...rest1 } = buttonProps1
          const { text: text2, ...rest2 } = buttonProps2

          return <div className={classes.actions}>
            <Button {...rest1}>
              {text1}
            </Button>
            <Button {...rest2}>
              {text2}
            </Button>
          </div>
        }}
      </PropExplorer>
    </React.Fragment>
  }
}

export const ButtonBasic = compose(
  withStyles(styles)
)(ButtonBasicPlain)

export default ButtonBasic
