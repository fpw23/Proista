import _ from 'lodash'
import { showSnackbar } from './SnackbarUtilsConfigurator'

export const displayRuleMessages = (messages) => {
  if (_.isArray(messages) === false) {
    showSnackbar.error('Submit Failed!  Error is not Collection')
  } else {
    const ruleMessages = _.filter(messages, { Type: 'Rule' })

    if (ruleMessages.length > 0) {
      _.each(ruleMessages, (rm) => {
        showSnackbar.warning(rm.Message)
      })
    }
  }
}
