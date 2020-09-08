import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
import { FieldLayoutBox } from '../FieldLayoutBox'
import { Row, Col, LayoutSizes } from '../../Core/index'
import { FieldValueFormatter, FieldValueParser } from '../FieldValueConverters'
import Typography from '@material-ui/core/Typography'
import ListSubheader from '@material-ui/core/ListSubheader'

const useStyles = makeStyles((theme) => ({
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
}))

function not (a, b, valueProp) {
  return _.filter(a, (aValue) => { return _.find(b, (bValue) => { return aValue[valueProp] === bValue[valueProp] }) === undefined })
}

function intersection (a, b, valueProp) {
  return _.filter(a, (aValue) => { return _.find(b, (bValue) => { return aValue[valueProp] === bValue[valueProp] }) !== undefined })
}

function union (a, b, valueProp) {
  return [...a, ...not(b, a, valueProp)]
}

function TransferList (props) {
  const {
    value = [], options = [], leftTitle = 'Available', rightTitle = 'Selected', textProp = 'Text', valueProp = 'Value',
    onChange, groupProp = ''
  } = props
  const classes = useStyles()
  const [checked, setChecked] = React.useState([])
  const [left, setLeft] = React.useState(options)
  const [right, setRight] = React.useState(value)

  useEffect(() => {
    setLeft(options)
  }, options)

  const leftChecked = intersection(checked, left, valueProp)
  const rightChecked = intersection(checked, right, valueProp)

  const handleToggle = (value) => () => {
    const currentIndex = _.findIndex(checked, (v) => { return value[valueProp] === v[valueProp] })
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const numberOfChecked = (items) => intersection(checked, items, valueProp).length

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items, valueProp))
    } else {
      setChecked(union(checked, items, valueProp))
    }
  }

  const handleCheckedRight = () => {
    const newValues = [...right, ...leftChecked]
    setRight(newValues)
    setLeft(not(left, leftChecked, valueProp))
    setChecked(not(checked, leftChecked, valueProp))
    if (_.isFunction(onChange)) {
      onChange(newValues)
    }
  }

  const handleCheckedLeft = () => {
    const newValues = not(right, rightChecked, valueProp)
    setLeft([...left, ...rightChecked])
    setRight(newValues)
    setChecked(not(checked, rightChecked, valueProp))
    if (_.isFunction(onChange)) {
      onChange(newValues)
    }
  }

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
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
                <ListItem key={value[valueProp]} role="listitem" button onClick={handleToggle(value)}>
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
              <ListItem key={value[valueProp]} role="listitem" button onClick={handleToggle(value)}>
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
  )

  return (
    <Row justify="center" alignItems="center" className={classes.root}>
      <Col layout={LayoutSizes.Five}>{customList(leftTitle, left)}</Col>
      <Col layout={LayoutSizes.Two}>
        <Row direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Row>
      </Col>
      <Col layout={LayoutSizes.Five}>{customList(rightTitle, right)}</Col>
    </Row>
  )
}

export class TransferListBoxClass extends React.Component {
  render () {
    const { options = [], groupProp, textProp, valueProp, ...rest } = this.props
    return (
      <FieldLayoutBox {...rest}>
        {({ showError, value = [], onChange, name, placeHolder, loading, readonly, testId, onBlur, label }) => {
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
                groupProp={groupProp}
                textProp={textProp}
                valueProp={valueProp}
                data-tid={testId}
                options={options}
                value={value}
                onChange={onChange}
                id={htmlId}
                name={htmlId}
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
