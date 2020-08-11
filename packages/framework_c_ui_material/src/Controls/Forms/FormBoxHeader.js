import React from 'react'
import Col from '../Core/Col'
import Row from '../Core/Row'
import LayoutSizes from '../Core/LayoutSizes'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  hrerror: {
    borderTop: `1px solid ${theme.palette.error.main}`
  },
  hrprimary: {
    borderTop: `1px solid ${theme.palette.primary.main}`
  },
  hrsecondary: {
    borderTop: `1px solid ${theme.palette.secondary.main}`
  },
  hrtextPrimary: {
    borderTop: `1px solid ${theme.palette.text.primary}`
  },
  hrtextSecondary: {
    borderTop: `1px solid ${theme.palette.text.secondary}`
  },
  rowGutterTop: {
    marginTop: '2rem'
  }
}))

export const FormBoxHeader = (props) => {
  const classes = useStyles()
  const { Title, children, color = 'initial', gutterTop = false } = props
  let hrClass = ''
  if (color !== 'initial' && color !== 'inherit') {
    hrClass = classes[`hr${color}`] || ''
  }
  return (
    <Row className={gutterTop ? classes.rowGutterTop : ''} >
      <Col layout={LayoutSizes.Full}>
        <Typography variant='h5' color={color || 'initial'}>{Title}</Typography>
        <hr className={hrClass} />
        {children}
      </Col>
    </Row>
  )
}
