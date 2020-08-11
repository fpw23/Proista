import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export const WithMediaQuery = (queries = []) => WrappedComponent => props => {
  const mediaProps = {}
  queries.forEach(q => {
    mediaProps[q[0]] = useMediaQuery(q[1])
  })
  return <WrappedComponent {...mediaProps} {...props} />
}
