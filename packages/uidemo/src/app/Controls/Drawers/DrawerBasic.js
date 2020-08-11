import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import { Button, DrawerChannels, DrawerStandardStyles } from '@proista/client-ui-material/lib/Controls/Core/index'
import propSchema from './DrawerBasicProps.json'
import { PropExplorer } from '../PropExplorer'
import { SendBusMessage } from '@proista/client/lib/Tools/index'

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

const MyDrawerBodyStyles = makeStyles({
  ...DrawerStandardStyles
})

const MyDrawerBody = (props) => {
  const classes = MyDrawerBodyStyles()

  let sizeClass = ''
  if (props.anchor === 'top' || props.anchor === 'bottom') {
    sizeClass = 'V'
  } else if (props.anchor === 'left' || props.anchor === 'right') {
    sizeClass = 'H'
  }

  sizeClass = sizeClass + props.size

  console.log(sizeClass)
  console.log(classes)
  console.log(props)

  return <React.Fragment>
    <div className={classes[sizeClass]}>
      <h2>My Draw Body</h2>
      <p>{props.BodyText}</p>
      <Button variant="contained" color="primary" onClick={props.close}>Close</Button>
    </div>
  </React.Fragment>
}

export class DrawerBasicPlain extends React.Component {
  componentDidMount () {
    SendBusMessage(DrawerChannels.NewRegister({ key: 'UITests.MyDrawerBody', component: MyDrawerBody }))
  }

  componentWillUnmount () {
    SendBusMessage(DrawerChannels.NewUnregister({ key: 'UITests.MyDrawerBody' }))
  }

  onClick = (drawerProps) => {
    const { anchor } = drawerProps
    SendBusMessage(DrawerChannels.NewShow({ key: 'UITests.MyDrawerBody', props: drawerProps, anchor: anchor }))
  }

  render () {
    const { classes } = this.props
    return <React.Fragment>
      <PropExplorer propSchema={propSchema}>
        {(drawerProps) => {
          console.log(drawerProps)
          return <div className={classes.actions}>
            <Button variant="contained" color="secondary" onClick={() => { this.onClick(drawerProps) }}>
              Open
            </Button>
          </div>
        }}
      </PropExplorer>
    </React.Fragment>
  }
}

export const DrawerBasic = compose(
  withStyles(styles)
)(DrawerBasicPlain)

export default DrawerBasic
