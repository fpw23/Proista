import React from 'react'
import _ from 'lodash'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Link as ReachLink, Location } from '@reach/router'
import { resolve } from '@reach/router/lib/utils'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

export class SideBarLink extends React.Component {
  render () {
    const { title, subTitle, to, icon, relativePath, ...passProps } = this.props

    return (
      <Location>
        {({ location }) => {
          const href = resolve(to, relativePath || '/')
          const encodedHref = encodeURI(href)
          const selected = _.startsWith(location.pathname, encodedHref)
          return <ListItem button component={ReachLink} selected={selected} to={href} {...passProps}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={title} secondary={subTitle} />
          </ListItem>
        }}
      </Location>

    )
  }
}

export class SideBarBackLink extends React.Component {
  render () {
    const { title = 'Back', subTitle = 'Return to previous', noIcon = false, relativePath, ...passProps } = this.props

    return (
      <Location>
        {({ location }) => {
          const href = resolve('../', relativePath || '/')
          return <ListItem button component={ReachLink} to={href} {...passProps}>
            {noIcon === true ? null : <ListItemIcon><ArrowBackIcon /></ListItemIcon> }
            <ListItemText primary={title} secondary={subTitle} />
          </ListItem>
        }}
      </Location>

    )
  }
}

export const SideBarButton = (props) => {
  return (
    <ListItem key={props.key} button onClick={props.onClick}>
      {props.icon ? <ListItemIcon>{props.icon}</ListItemIcon> : null}
      <ListItemText primary={props.title} secondary={props.subTitle} />
    </ListItem>
  )
}

export class SideBarList extends React.Component {
  render () {
    const { children } = this.props

    return <List>
      {children}
    </List>
  }
}
