import React from 'react'
import { FormBox, TextBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes } from '@proista/client-ui-material/lib/Controls/Core/index'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import propSchema from './TextBoxDebounceProps.json'
import { PropExplorer } from '../PropExplorer'

const styles = (theme) => ({
  root: {
    width: '100%'
  }
})

export class TextBoxDebouncePlain extends React.Component {
  render () {
    const { classes } = this.props
    return <React.Fragment>
      <PropExplorer propSchema={propSchema}>
        {({ formbox = {}, textbox = {} }) => {
          return <div className={classes.root}>
            <FormBox {...formbox} form='Test_TextBoxDebounce'>
              <Row>
                <TextBox {...textbox} name='DebounceValue' label='Debounce' layout={LayoutSizes.Full} />
              </Row>
            </FormBox>
          </div>
        }}
      </PropExplorer>
    </React.Fragment>
  }
}

export const TextBoxDebounce = compose(
  withStyles(styles)
)(TextBoxDebouncePlain)

export default TextBoxDebounce
