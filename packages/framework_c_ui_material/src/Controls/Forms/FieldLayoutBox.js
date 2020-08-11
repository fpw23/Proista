import React from 'react'
import { FormBoxContext } from './FormBoxContext'
import _ from 'lodash'
import Col from '../Core/Col'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import Skeleton from '@material-ui/lab/Skeleton'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

const styles = (theme) => ({
  debugFormHelperText: {
    color: `${theme.palette.info.main} !important`
  }
})

export class FieldLayoutBoxPlain extends React.Component {
  static contextType = FormBoxContext

  static defaultProps = {
    hide: false,
    debugMode: false
  }

  render () {
    const {
      meta, label, caption, layout, hide, loadingOptions = {
        variant: 'text',
        height: '4rem'
      }, classes,
      input: { value, onChange, onBlur, name, onFocus },
      placeHolder, children, className, required = false, color,
      readonly: localReadOnly, 'data-tid': testId = '', debugMode: localDebugMode = false,
      variant
    } = this.props
    const { loading = false, readonly: contextReadOnly = false, sideEffects = {}, debugMode: contextDebugMode = false } = this.context

    const effects = _.get(sideEffects, name) || {}

    if (hide || effects.hide) {
      return null
    }

    let showError = false
    showError = meta.touched === true && meta.invalid === true
    const errorMessage = showError === true ? meta.error || '' : ''

    let readonly = contextReadOnly === true

    if (localReadOnly === true) {
      readonly = true
    }

    if (effects.readOnly === true) {
      readonly = true
    }

    let debugMode = contextDebugMode === true

    if (localDebugMode === true) {
      debugMode = true
    }

    const fieldBody = loading === true
      ? <Skeleton {...loadingOptions} />
      : children({
        showError,
        value,
        onChange,
        onBlur,
        name,
        onFocus,
        placeHolder,
        loading,
        testId,
        readonly,
        caption,
        label,
        sideEffects: effects
      })

    const fieldLayout = (
      <FormControl
        className={className}
        disabled={readonly}
        error={showError}
        fullWidth={true}
        required={required}
        color={color}
        variant={variant || readonly === true ? 'filled' : 'outlined'}
      >
        {fieldBody}
        {loading !== true
          ? showError === true
            ? <FormHelperText key='err' error>{errorMessage}</FormHelperText>
            : <FormHelperText key='caption'>{caption}</FormHelperText>
          : null
        }
        {debugMode
          ? <React.Fragment>
            <FormHelperText className={classes.debugFormHelperText}>{`Field: ${name}`}</FormHelperText>
            <FormHelperText className={classes.debugFormHelperText}>{`Value: ${value}`}</FormHelperText>
          </React.Fragment>
          : null
        }
      </FormControl>
    )

    if (layout) {
      return (<Col layout={layout}>
        {fieldLayout}
      </Col>)
    } else {
      return fieldLayout
    }
  }
}

export const FieldLayoutBox = compose(
  withStyles(styles)
)(FieldLayoutBoxPlain)
