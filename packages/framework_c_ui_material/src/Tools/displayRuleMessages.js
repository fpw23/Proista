import _ from 'lodash'

export const displayRuleMessages = (enqueueSnackbar) => {
  return (messages) => {
    if (_.isArray(messages) === false) {
      enqueueSnackbar('Submit Failed!  Error is not Collection', {
        variant: 'error'
      })
    } else {
      const ruleMessages = _.filter(messages, { Type: 'Rule' })

      if (ruleMessages.length > 0) {
        _.each(ruleMessages, (rm) => {
          enqueueSnackbar(rm.Message, {
            variant: 'warning'
          })
        })
      }
    }
  }
}
