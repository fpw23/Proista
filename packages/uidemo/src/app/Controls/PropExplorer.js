import React from 'react'
import { Row, Col, LayoutSizes } from '@proista/client-ui-material/lib/Controls/Core/index'
import Container from '@material-ui/core/Container'
import Form from '@rjsf/material-ui'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { compose } from '@proista/client-tools/lib/index'
import _ from 'lodash'

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(1)
  }
})

export class PropExplorerPlain extends React.Component {
  constructor (props) {
    super(props)

    const {
      propSchema = {
        schema: {},
        uiSchema: {}
      }
    } = props

    this.state = {
      formData: {},
      formSchemas: propSchema
    }
  }

  onChange = (formData = {}) => {
    this.setState({
      formData: formData.formData || {}
    })
  }

  render () {
    const { children, classes } = this.props
    const { formData = {}, formSchemas } = this.state
    return <Container disableGutters>
      <Row>
        <Col layout={LayoutSizes.Eight}>
          {_.isFunction(children) ? children({ ...formData }) : null}
        </Col>
        <Col layout={LayoutSizes.Four}>
          <Paper className={classes.paper}>
            <Form
              schema={formSchemas.schema}
              uiSchema={formSchemas.uiSchema}
              onChange={this.onChange}
              formData={formData}
            ><div></div></Form>
          </Paper>
        </Col>
      </Row>
    </Container>
  }
}

export const PropExplorer = compose(
  withStyles(styles)
)(PropExplorerPlain)

export default PropExplorer
