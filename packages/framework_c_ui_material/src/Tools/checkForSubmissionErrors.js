import { convertMessageErrorsToFormErrors } from '@proista/client/lib/Tools/index'
import { SubmissionError } from 'redux-form'
import { showSnackbar } from './SnackbarUtilsConfigurator'

export const checkForSubmissionErrors = (error, throwEx = true) => {
  var ret = convertMessageErrorsToFormErrors(error)

  if (ret) {
    if (ret.success === false) {
      if (throwEx === true) {
        throw new SubmissionError({
          _error: 'Submit Failed!'
        })
      } else {
        return ret.data
      }
    } else {
      showSnackbar.warning('Validation Failed!')
      if (throwEx === true) {
        throw new SubmissionError(ret.errors)
      } else {
        return ret
      }
    }
  }
}
