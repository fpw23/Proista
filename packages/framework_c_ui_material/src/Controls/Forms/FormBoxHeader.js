import React from 'react'
import Col from '../Core/Col'
import Row from '../Core/Row'
import LayoutSizes from '../Core/LayoutSizes'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  hrinitial: {
    border: `1px solid ${theme.palette.text.primary}`,
    backgroundColor: theme.palette.text.primary,
    height: '3px'
  },
  hrinherit: {
    border: `1px solid ${theme.palette.text.primary}`,
    backgroundColor: theme.palette.text.primary,
    height: '3px'
  },
  hrerror: {
    border: `1px solid ${theme.palette.error.main}`,
    backgroundColor: theme.palette.error.main,
    height: '3px'
  },
  hrprimary: {
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    height: '3px'
  },
  hrsecondary: {
    border: `1px solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.secondary.main,
    height: '3px'
  },
  hrtextPrimary: {
    border: `1px solid ${theme.palette.text.primary}`,
    backgroundColor: theme.palette.text.primary,
    height: '3px'
  },
  hrtextSecondary: {
    border: `1px solid ${theme.palette.text.secondary}`,
    backgroundColor: theme.palette.text.secondary,
    height: '3px'
  },
  rowGutterTop: {
    marginTop: '2rem'
  }
}))

export const FormBoxHeader = (props) => {
  const classes = useStyles()
  const { title, children, color = 'initial', gutterTop = false, hide = false } = props
  const hrClass = classes[`hr${color}`]
  if (hide === true) {
    return null
  }
  return (
    <Row className={gutterTop ? classes.rowGutterTop : ''} >
      <Col layout={LayoutSizes.Full}>
        <Typography variant='h5' color={color || 'initial'}>{title}</Typography>
        <hr className={hrClass} />
        {children}
      </Col>
    </Row>
  )
}
