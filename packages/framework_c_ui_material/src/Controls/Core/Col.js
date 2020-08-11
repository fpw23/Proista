import React from 'react'
import Grid from '@material-ui/core/Grid'
import _ from 'lodash'
import { LayoutSizes } from './LayoutSizes'

export const Col = (props) => {
  const { children, hide = false, layout = LayoutSizes.Half, ...rest } = props

  if (hide === true) {
    return null
  }

  const gridProps = _.merge({
  },
  rest,
  {
    container: false,
    item: true
  },
  layout || {})

  return (
    <Grid {...gridProps}>{children}</Grid>
  )
}

export default Col
