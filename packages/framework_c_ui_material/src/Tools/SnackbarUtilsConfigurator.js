import { useSnackbar } from 'notistack'
import React from 'react'
import Button from '@material-ui/core/Button'
import _ from 'lodash'

const InnerSnackbarUtilsConfigurator = (props) => {
  props.setUseSnackbarRef(useSnackbar())
  return null
}

let useSnackbarRef
const setUseSnackbarRef = (useSnackbarRefProp) => {
  useSnackbarRef = useSnackbarRefProp
}

export const SnackbarUtilsConfigurator = () => {
  return <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
}

export const showSnackbar = {
  success (msg, options) {
    this.toast(msg, 'success', options)
  },
  warning (msg, options) {
    this.toast(msg, 'warning', options)
  },
  info (msg, options) {
    this.toast(msg, 'info', options)
  },
  error (msg, options) {
    this.toast(msg, 'error', options)
  },
  confirm (msg, options = {}) {
    const { callBack, trueText = 'Yes', falseText = 'No', ...opts } = options
    this.toast(msg, 'warning', {
      ...opts,
      action: (key) => (
        [
          <Button key='trueOption' onClick={() => { useSnackbarRef.closeSnackbar(key); callBack() }}>
            {trueText}
          </Button>,
          <Button key='falseOption' onClick={() => { useSnackbarRef.closeSnackbar(key) }}>
            {falseText}
          </Button>
        ]
      ),
      persist: true,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    })
  },
  toast (msg, variant = 'default', options = {}) {
    const opts = _.merge({ variant: variant }, options)
    useSnackbarRef.enqueueSnackbar(msg, opts)
  }
}
