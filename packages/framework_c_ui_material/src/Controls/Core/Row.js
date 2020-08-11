import React from 'react'
import Grid from '@material-ui/core/Grid'
import _ from 'lodash'

export const Row = (props) => {
  const { children, hide = false, ...rest } = props

  if (hide === true) {
    return null
  }

  const gridProps = _.merge({
    spacing: 3
  }, rest, {
    container: true,
    item: false
  })

  return (
    <Grid container {...gridProps}>{children}</Grid>
  )
}

export default Row
