import React from 'react'
import { Link as ReachLink } from '@reach/router'
import Link from '@material-ui/core/Link'

export const RouteLink = (props) => <Link {...props} component={ReachLink} />

export default RouteLink
