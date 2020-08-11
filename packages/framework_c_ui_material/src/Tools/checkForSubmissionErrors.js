import { convertMessageErrorsToFormErrors } from '@proista/client/lib/Tools/index'
import { SubmissionError } from 'redux-form'

export const checkForSubmissionErrors = (enqueueSnackbar) => {
  return (error, throwEx = true) => {
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
        enqueueSnackbar('Validation Failed!', {
          variant: 'warning'
        })
        if (throwEx === true) {
          throw new SubmissionError(ret.errors)
        } else {
          return ret
        }
      }
    }
  }
}
