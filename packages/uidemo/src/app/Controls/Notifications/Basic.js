import React from 'react'
import { Button } from '@proista/client-ui-material/lib/Controls/Core/index'
import { showSnackbar } from '@proista/client-ui-material/lib/Tools/SnackbarUtilsConfigurator'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import propSchema from './BasicProps.json'
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

export class BasicPlain extends React.Component {
  render () {
    const { classes } = this.props
    return <React.Fragment>
      <PropExplorer propSchema={propSchema}>
        {(toastProps) => {
          return <div className={classes.root}>
            <div className={classes.actions}>
              <Button variant="contained" color="secondary" onClick={() => { showSnackbar.success('Success', toastProps) }}>
                Success
              </Button>
              <Button variant="contained" color="secondary" onClick={() => { showSnackbar.warning('Warning', toastProps) }}>
                Warning
              </Button>
              <Button variant="contained" color="secondary" onClick={() => { showSnackbar.info('Info', toastProps) }}>
                Info
              </Button>
              <Button variant="contained" color="secondary" onClick={() => { showSnackbar.error('Error', toastProps) }}>
                Error
              </Button>
              <Button variant="contained" color="secondary" onClick={() => { showSnackbar.confirm('Are you sure?', { ...toastProps, callBack: () => { window.alert('You Clicked Yes!') } }) }}>
                Confirm
              </Button>
            </div>
          </div>
        }}
      </PropExplorer>
    </React.Fragment>
  }
}

export const Basic = compose(
  withStyles(styles)
)(BasicPlain)

export default Basic
