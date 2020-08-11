import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import MUIButton from '@material-ui/core/Button'

export const Button = (props) => {
  const { children, hide = false, disabled = false, size = 'medium', variant = 'contained', loading = false, color = 'inherit', ...rest } = props

  if (hide === true) {
    return null
  }

  const progressProps = {
    color: 'inherit',
    size: 24
  }
  return (
    <MUIButton
      startIcon={loading && <CircularProgress {...progressProps} />}
      disabled={loading || disabled}
      color={color || 'inherit'}
      size={size}
      variant={variant}
      {...rest}
    >
      {children}
    </MUIButton>
  )
}

export default Button
