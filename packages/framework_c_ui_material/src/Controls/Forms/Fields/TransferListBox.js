import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import _ from 'lodash'
import { Field } from 'redux-form'
import Typography from '@material-ui/core/Typography'
import ListSubheader from '@material-ui/core/ListSubheader'
import { comparePaths } from '@proista/client-tools/lib/comparePaths'
import Skeleton from '@material-ui/lab/Skeleton'
import { FieldLayoutBox } from '../FieldLayoutBox'
import { Row, Col, LayoutSizes } from '../../Core/index'
import { FieldValueFormatter, FieldValueParser } from '../FieldValueConverters'

const transferStyles = (theme) => ({
  root: {
    width: '100%'
  },
  cardHeader: {
    padding: theme.spacing(1, 2)
  },
  list: {
    width: '100%',
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto'
  },
  button: {
    margin: theme.spacing(0.5, 0)
  }
})

function not (a, b, valueProp) {
  return _.filter(a, (aValue) => { return _.find(b, (bValue) => { return aValue[valueProp] === bValue[valueProp] }) === undefined })
}

function intersection (a, b, valueProp) {
  return _.filter(a, (aValue) => { return _.find(b, (bValue) => { return aValue[valueProp] === bValue[valueProp] }) !== undefined })
}

function union (a, b, valueProp) {
  return [...a, ...not(b, a, valueProp)]
}

class TransferListPlain extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      checked: [],
      left: [],
      right: []
    }
  }

  componentDidMount () {
    this.setState((state, props) => {
      const { value = [], options = [], valueProp = 'Value' } = props
      return {
        left: not(options, value, valueProp),
        right: _.clone(value)
      }
    })
  }

  componentDidUpdate (prevProps, prevState) {
    const options = comparePaths('options', this.props, prevProps, [])

    if (options.HasChanged) {
      console.log('Opts Changed!')
      const { value = [], valueProp = 'Value' } = this.props
      this.setState({
        left: not(options.Current, value, valueProp),
        right: _.clone(value)
      })
    }
  }

  handleToggle = (value) => () => {
    const { valueProp } = this.props
    const { checked } = this.state
    const currentIndex = _.findIndex(checked, (v) => { return value[valueProp] === v[valueProp] })
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    this.setState({
      checked: newChecked
    })
  }

  handleToggleAll = (items) => () => {
    this.setState((state, props) => {
      const { checked } = state
      const { valueProp } = props
      if (this.numberOfChecked(items) === items.length) {
        return {
          checked: not(checked, items, valueProp)
        }
      } else {
        return {
          checked: union(checked, items, valueProp)
        }
      }
    })
  }

  handleCheckedRight = () => {
    this.setState((state, props) => {
      const { checked, left, right } = state
      const { valueProp, onChange } = props
      const leftChecked = intersection(checked, left, valueProp)
      const newValues = [...right, ...leftChecked]

      if (_.isFunction(onChange)) {
        onChange(newValues)
      }
      return {
        left: not(left, leftChecked, valueProp),
        right: newValues,
        checked: not(checked, leftChecked, valueProp)
      }
    })
  }

  handleCheckedLeft = () => {
    this.setState((state, props) => {
      const { right, left, checked } = state
      const { valueProp, onChange } = props
      const rightChecked = intersection(checked, right, valueProp)
      const newValues = not(right, rightChecked, valueProp)
      if (_.isFunction(onChange)) {
        onChange(newValues)
      }
      return {
        left: [...left, ...rightChecked],
        right: newValues,
        checked: not(checked, rightChecked, valueProp)
      }
    })
  }

  numberOfChecked = (items) => {
    const { checked } = this.state
    const { valueProp } = this.props
    return intersection(checked, items, valueProp).length
  }

  renderList = (title, items) => {
    const { classes, groupProp, valueProp, textProp } = this.props
    const { checked } = this.state

    return <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={this.handleToggleAll(items)}
            checked={this.numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={this.numberOfChecked(items) !== items.length && this.numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${this.numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {groupProp
          ? _.map(_.toPairs(_.groupBy(items, (i) => { return _.get(i, groupProp, '?') })), ([groupName, groupItems]) => {
            const ret = [
              <ListSubheader key={`group_${groupName}`}>
                {groupName}
              </ListSubheader>
            ]
            for (const value of groupItems) {
              const labelId = `transfer-list-all-item-${value[valueProp]}-label`
              ret.push(
                <ListItem key={value[valueProp]} role="listitem" button onClick={this.handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={_.find(checked, (v) => { return v[valueProp] === value[valueProp] }) !== undefined}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value[textProp]} />
                </ListItem>
              )
            }
            return ret
          })
          : _.map(items, (value) => {
            const labelId = `transfer-list-all-item-${value[valueProp]}-label`

            return (
              <ListItem key={value[valueProp]} role="listitem" button onClick={this.handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    checked={_.find(checked, (v) => { return v[valueProp] === value[valueProp] }) !== undefined}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value[textProp]} />
              </ListItem>
            )
          })}
      </List>
    </Card>
  }

  render () {
    const { classes, leftTitle = 'Available', rightTitle = 'New', valueProp, loading = false } = this.props
    const { left, right, checked } = this.state
    const leftChecked = intersection(checked, left, valueProp)
    const rightChecked = intersection(checked, right, valueProp)

    return <Row justify="center" alignItems="center" className={classes.root}>
      <Col layout={LayoutSizes.Five}>{loading === true ? <Skeleton variant='rect' height='10rem' /> : this.renderList(leftTitle, left)}</Col>
      <Col layout={LayoutSizes.Two}>
        <Row direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={this.handleCheckedRight}
            disabled={loading || leftChecked.length === 0}
            aria-label="move selected right"
          >
          &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={this.handleCheckedLeft}
            disabled={loading || rightChecked.length === 0}
            aria-label="move selected left"
          >
          &lt;
          </Button>
        </Row>
      </Col>
      <Col layout={LayoutSizes.Five}>{loading === true ? <Skeleton variant='rect' height='10rem' /> : this.renderList(rightTitle, right)}</Col>
    </Row>
  }
}

const TransferList = withStyles(transferStyles)(TransferListPlain)

export class TransferListBoxClass extends React.Component {
  getValue = (reduxValues) => {
    const { options, valueProp = 'Value' } = this.props

    let ret = []
    if (_.isArray(reduxValues)) {
      for (const key of reduxValues) {
        const matches = _.filter(options, (o) => {
          return o[valueProp] === key
        })
        if (matches.length > 0) {
          ret = [...ret, ...matches]
        }
      }
    }

    return ret
  }

  onChange = (newValues) => {
    console.log('on change', newValues)
    const { valueProp = 'Value', input: { onChange } } = this.props
    const ret = _.map(newValues, (v) => { return v[valueProp] })
    onChange(ret)
  }

  render () {
    const { options = [], groupProp, textProp = 'Text', valueProp = 'Value', rightTitle, leftTitle, ...rest } = this.props
    return (
      <FieldLayoutBox customLoading {...rest}>
        {({ showError, value = [], name, placeHolder, loading, readonly, testId, onBlur, label }) => {
          const htmlId = `transferlist_${name}`
          return <Row>
            {label && (
              <Col layout={LayoutSizes.Full}>
                <Typography variant="h6" gutterBottom>
                  {label}
                </Typography>
              </Col>
            )}
            <Col layout={LayoutSizes.Full}>
              <TransferList
                rightTitle={rightTitle}
                leftTitle={leftTitle}
                groupProp={groupProp}
                textProp={textProp}
                valueProp={valueProp}
                data-tid={testId}
                options={options}
                value={this.getValue(value)}
                onChange={this.onChange}
                id={htmlId}
                name={htmlId}
                readonly={readonly}
                loading={loading}
              />
            </Col>
          </Row>
        }}
      </FieldLayoutBox>
    )
  }
}

  export const TransferListBox = ({ parse, format, fieldType, ...rest }) => { return <Field parse={fieldType ? FieldValueParser(fieldType) : parse} format={fieldType ? FieldValueFormatter(fieldType) : format} {...rest} component={TransferListBoxClass} /> } // eslint-disable-line
export default TransferListBox
