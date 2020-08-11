import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, withStyles, Breadcrumbs } from '@material-ui/core'
import clsx from 'clsx'
import MenuIcon from '@material-ui/icons/Menu'
import { compose } from '@proista/client-tools/lib/index'
import path from 'path'
import HomeIcon from '@material-ui/icons/Home'
import { RouteLink } from '../../Core/RouteLink'
import _ from 'lodash'

const styles = (theme) => ({
  breadCrumbs: {
    color: theme.palette.primary.contrastText
  },
  breadCrumbHomeLink: {
    color: theme.palette.primary.contrastText,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  breadCrumbHomeIcon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20
  },
  hide: {
    display: 'none'
  }
})

export class TopBarPlain extends React.Component {
  renderBreadCrumbs = (pathNames, routeInfo, classes) => {
    let currentURL = ''
    const urlParts = _.split(routeInfo.pathname, '/')
    _.remove(urlParts, (p) => { return p === '' })

    if (urlParts.length < 1) {
      return null
    }

    currentURL = '/'
    const lastPartIndex = urlParts.length - 1

    return <Breadcrumbs className={classes.breadCrumbs} separator="›" aria-label="breadcrumb">
      <RouteLink className={classes.breadCrumbHomeLink} key='homelink' to='/'>
        <HomeIcon className={classes.breadCrumbHomeIcon} />
      </RouteLink>
      {_.map(urlParts, (p, i) => {
        if (p) {
          let v = p

          const pathName = _.find(pathNames, { key: p })
          if (pathName) {
            v = pathName.value
          }

          currentURL = path.join(currentURL, p)

          let crumbContents = <RouteLink className={classes.breadCrumbs} key={p} to={currentURL}>{v}</RouteLink>

          if (i === lastPartIndex) {
            crumbContents = <Typography className={classes.breadCrumbs} key={p}>{v}</Typography>
          }

          if (pathName) {
            if (pathName.disabled) {
              crumbContents = <Typography className={classes.breadCrumbs} key={p}>{v}</Typography>
            }
          }

          return crumbContents
        }
      })}
    </Breadcrumbs>
  }

  render () {
    const {
      classes, hideMenuIcon = false, RouterPathNames = [], RouterCurrentRoute = {}, onMenuClick
    } = this.props
    return (
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
            edge="start"
            className={clsx(classes.menuButton, hideMenuIcon && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.menuMiddle}>
            {this.renderBreadCrumbs(RouterPathNames, RouterCurrentRoute, classes)}
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

export const TopBar = compose(
  withStyles(styles)
)(TopBarPlain)
