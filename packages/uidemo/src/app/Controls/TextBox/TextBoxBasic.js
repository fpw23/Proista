import React from 'react'
import { FormBox, TextBox } from '@proista/client-ui-material/lib/Controls/Forms/index'
import { Row, LayoutSizes } from '@proista/client-ui-material/lib/Controls/Core/index'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import propSchema from './TextBoxBasicProps.json'
import { PropExplorer } from '../PropExplorer'

const styles = (theme) => ({
  root: {
    width: '100%'
  }
})

export class TextBoxBasicPlain extends React.Component {
  render () {
    const { classes } = this.props
    return <React.Fragment>
      <PropExplorer propSchema={propSchema}>
        {({ formbox = {}, textbox = {} }) => {
          return <div className={classes.root}>
            <FormBox {...formbox} form='Test_TextBoxBasic' onSubmit={(values) => { console.log(values) }}>
              <Row>
                <TextBox debounce={{ enabled: false }} {...textbox} name='Plain' label='Plain' layout={LayoutSizes.Half} />
                <TextBox debounce={{ enabled: false }} {...textbox} name='Password' password label='Password' layout={LayoutSizes.Half} />
                <TextBox debounce={{ enabled: false }} {...textbox} name='FullWidth' label='Full Width' layout={LayoutSizes.Full} />
              </Row>
            </FormBox>
          </div>
        }}
      </PropExplorer>
    </React.Fragment>
  }
}

export const TextBoxBasic = compose(
  withStyles(styles)
)(TextBoxBasicPlain)

export default TextBoxBasic
