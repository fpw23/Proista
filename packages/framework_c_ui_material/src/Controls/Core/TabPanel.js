import React from 'react'

export const TabPanel = (props) => {
  const { children, value, index, keepChildren = false, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      {...other}
      style={{ height: '100%', position: 'relative', width: '100%' }}
    >
      {keepChildren === true
        ? children
        : value === index
          ? children
          : null
      }
    </div>
  )
}
