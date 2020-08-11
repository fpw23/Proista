import React from 'react'

export const DynamicFormContext = React.createContext(
  {
    sideEffects: {},
    brokenRules: []
  }
)

DynamicFormContext.displayName = 'DynamicFormContext'

export const withDynamicFormContext = Element => {
  return React.forwardRef((props, ref) => {
    return (
      <DynamicFormContext.Consumer>
        {context => <Element dynamicFormContext={context} {...props} ref={ref} />}
      </DynamicFormContext.Consumer>
    )
  })
}
