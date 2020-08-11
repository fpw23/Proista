import React from 'react'
import { BlocklyEditor } from '@proista/client-ui-blockly/lib/Editor'
import { TopBarAndBody } from '../../Styles/TopBarAndBody'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import _ from 'lodash'

const styles = (theme) => ({
  ...TopBarAndBody,
  menuButton: {
    marginRight: theme.spacing(2),
    padding: '5px'
  },
  appBar: {
    backgroundColor: '#CDCDCD',
    minHeight: '35px'
  },
  appToolBar: {
    minHeight: '35px',
    paddingLeft: '10px',
    paddingRight: '10px'
  },
  windowWrapper: {
    height: '100%',
    width: '100%',
    position: 'relative'
  }
})

class BlocklyEditorWithToolBarPlain extends React.Component {
  render () {
    const { actions = [], className, ...rest } = this.props

    const { classes } = this.props
    return <div className={classes.root}>
      <div className={classes.topBar}>
        <AppBar className={classes.appBar} position="relative">
          <Toolbar variant='dense' className={classes.appToolBar}>
            <div>
              {_.map(actions, (a, i) => (
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  {a}
                </IconButton>
              ))}
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.body}>
        <BlocklyEditor {...rest} className={classes.windowWrapper} />
      </div>
    </div>
  }
}

export const BlocklyEditorWithToolBar = compose(
  withStyles(styles)
)(BlocklyEditorWithToolBarPlain)

export default BlocklyEditorWithToolBar
