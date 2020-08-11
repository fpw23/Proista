import React from 'react'
import clsx from 'clsx'
import _ from 'lodash'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { Drawer, Divider, IconButton } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { compose, comparePaths } from '@proista/client-tools/lib/index'
import { WithComponentState } from '@proista/client/lib/Tools/WithComponentState'
import { sh as RState } from '@proista/client/lib/Data/Router/Types'
import { WithMediaQuery } from '../../../Tools/WithMediaQuery'
import { TopBar } from './TopBar'

const drawerWidth = 240

const styles = (theme) => ({
  logo: {
    height: '60px'
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  bodyOpen: {
    transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)',
    marginLeft: drawerWidth
  },
  bodyClosed: {
    transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)'
  }
})

export class LayoutPlain extends React.Component {
    handleDrawerOpen = () => {
      const { SetAppValue } = this.props
      SetAppValue('isSideBarOpen', true)
    }

    handleDrawerClose = () => {
      const { SetAppValue } = this.props
      SetAppValue('isSideBarOpen', false)
    }

    componentDidUpdate (prevProps) {
      const isDesktop = comparePaths('isDesktop', this.props, prevProps, undefined)

      if (isDesktop.Current !== isDesktop.Previous) {
        const { SetAppValue } = this.props
        SetAppValue('isDesktop', isDesktop.Current)
        if (isDesktop.Current === true && isDesktop.Previous === false) {
          SetAppValue('isSideBarOpen', true)
        }
      }
    }

    render () {
      const {
        classes, theme, children, TopNavComponent = TopBar, RouterPathNames = [], RouterCurrentRoute = {},
        AppData: { isSideBarOpen = false, isDesktop = false }, sideBar, logoPath
      } = this.props

      let sideBarRender

      if (_.isFunction(sideBar)) {
        sideBarRender = sideBar()
      } else {
        sideBarRender = sideBar
      }

      return (
        <div>
          <Drawer
            className={classes.drawer}
            variant={isDesktop === true ? 'persistent' : undefined}
            anchor="left"
            open={isSideBarOpen}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              {logoPath ? <img className={classes.logo} src={logoPath} /> : null }
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            {sideBarRender}
          </Drawer>
          <div
            className={clsx(
              {
                [classes.bodyClosed]: !isSideBarOpen & isDesktop,
                [classes.bodyOpen]: isSideBarOpen & isDesktop
              }
            )}
          >
            {TopNavComponent
              ? <TopNavComponent hideMenuIcon={isSideBarOpen} onMenuClick={this.handleDrawerOpen} RouterPathNames={RouterPathNames} RouterCurrentRoute={RouterCurrentRoute} />
              : null
            }
            {children}
          </div>
        </div>
      )
    }
}

export const Layout = compose(
  WithMediaQuery([
    ['isDesktop', theme => theme.breakpoints.up('lg'), {
      defaultMatches: true
    }]
  ]),
  withStyles(styles),
  withTheme,
  WithRedux([RState.PathNames, RState.CurrentRoute]),
  WithComponentState({ stateKey: 'Controls_Layout', clearOnUnmount: false })
)(LayoutPlain)
