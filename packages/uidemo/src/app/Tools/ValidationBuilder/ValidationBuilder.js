import React from 'react'
import { compose } from '@proista/client-tools/lib/index'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { withStyles } from '@material-ui/core/styles'
import { showSnackbar } from '@proista/client-ui-material/lib/Tools/SnackbarUtilsConfigurator'
import { DrawerStandardStyles, TabPanel, Button } from '@proista/client-ui-material/lib/Controls/Core'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import SplitPane from 'react-split-pane'
import CloseIcon from '@material-ui/icons/Close'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import clsx from 'clsx'
import _ from 'lodash'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import { ValidationBuilderEditor } from './Editor/ValidationBuilderEditor'
import { CodeEditor } from '@proista/client-ui-material/lib/Controls/Editors/CodeEditor'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { TestValidation, Joi as JoiLib } from '@proista/client/lib/Tools/Validation'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { Alert, AlertTitle } from '@material-ui/lab'

const styles = (theme) => ({
  ...DrawerStandardStyles,
  wrapper: {
    padding: '0px'
  },
  root: {
    display: 'grid',
    height: '100vh',
    width: '100vw',
    gridTemplateRows: 'max-content 1fr',
    gridAutoColumns: '1fr',
    gridTemplateAreas: '"topBar" "body"',
    position: 'relative',
    boxSizing: 'border-box'
  },
  topBar: {
    gridArea: 'topBar',
    position: 'relative'
  },
  body: {
    gridArea: 'body',
    position: 'relative'
  },
  actionButton: {
    color: theme.palette.secondary.contrastText
  },
  title: {
    flex: 4,
    color: theme.palette.secondary.contrastText
  },
  bodyLeft: {
    height: '100%'
  },
  bodyRight: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  bodyRightTabs: {
    height: 'max-content'
  },
  bodyRightContent: {
    flexGrow: 1,
    height: '100%'
  }
})

export class ValidationBuilderPlain extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      VSplit: 0,
      selectedTab: 0,
      code: '[]',
      xml: '',
      actions: [],
      testData: '{}',
      testDisplay: false,
      testResults: '',
      testDataJson: true
    }
  }

  onSplitResize = (name, newSize) => {
    this.setState({
      [`${name}Split`]: newSize || 0
    })
  }

  componentDidMount () {
    this.setState({
      actions: this.buildActions()
    })
  }

  buildActions = () => {
    const ret = []
    const { selectedTab } = this.state
    const { close } = this.props

    switch (selectedTab) {
      case 1:
        ret.push({ type: 'switch', checkedProp: 'testDataJson', onChange: this.onTestModeChanged, label: 'Is Json?' })
        ret.push({ type: 'button', onClick: this.onRunTestResults, label: 'Run Test', icon: <PlayArrowIcon /> })
        break
    }

    ret.push({ type: 'button', onClick: close, label: 'Close', icon: <CloseIcon /> })

    return ret
  }

  onTabChanged = (evt, index) => {
    this.setState({
      selectedTab: index
    }, () => {
      this.setState({
        actions: this.buildActions()
      })
    })
  }

  onRunTestResults = () => {
    const { code, testData, testDataJson } = this.state

    try {
      // eslint-disable-next-line no-unused-vars
      const Joi = JoiLib
      const testSchema = {}
      // eslint-disable-next-line no-eval
      eval(`testSchema = ${_.replace(code, '// Joi Schema Below', '').replace(/\n/g, ' ')}`)
      // eslint-disable-next-line no-new-func
      const testValue = testDataJson ? JSON.parse(testData) : testData

      const results = TestValidation(testSchema, testValue)
      if (results.length === 0) {
        showSnackbar.success('No Validation Errors')
      } else {
        this.setState({
          testResults: results,
          testDisplay: true
        })
      }
    } catch (err) {
      showSnackbar.error(err.message)
    }
  }

  onTestModeChanged = (e) => {
    this.setState({
      testDataJson: e.target.checked
    })
  }

  onEditorChanged = (code, xml) => {
    this.setState({
      code: code,
      xml: xml
    })
  }

  renderActions = (actions = [], classes) => {
    return _.map(actions, (a, i) => {
      const { type } = a

      switch (type) {
        case 'button':
          return <IconButton key={a.label} onClick={a.onClick} aria-label={a.label} className={classes.actionButton} component="span">
            {a.icon}
          </IconButton>
        case 'switch': {
          const checked = this.state[a.checkedProp]
          return <FormControlLabel
            key={a.label}
            control={<Switch color='primary' checked={checked} onChange={a.onChange} name={`Switch${i}`} />}
            label={a.label}
          />
        }
      }
    })
  }

  onTestDataChanged = (txt) => {
    this.setState({
      testData: txt
    })
  }

  onTestDisplayClosed = () => {
    this.setState({
      testDisplay: false
    })
  }

  render () {
    const { classes } = this.props
    const { selectedTab, VSplit = 0, xml, code, actions = [], testData, testDisplay, testResults, testDataJson } = this.state

    return <div id='validationBuilder' className={clsx(classes.wrapper, classes.HFull)}>
      <div className={classes.root}>
        <div className={classes.topBar}>
          <AppBar color='secondary' position='relative'>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Validation Builder
              </Typography>
              {this.renderActions(actions, classes)}
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.body}>
          <SplitPane pane1Style={{ overflow: 'auto' }} split="vertical" onDragFinished={this.onSplitResize.bind(this, 'V')} minSize={'100px'} defaultSize={'60%'}>
            <div className={classes.bodyLeft}>
              <ValidationBuilderEditor designXML={xml} onChange={this.onEditorChanged} dimensions={{ Width: VSplit, SelectedTab: selectedTab }} containerId='#validationBuilder' />
            </div>
            <div className={classes.bodyRight}>
              <Paper className={classes.bodyRightTabs} square>
                <Tabs
                  value={selectedTab}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={this.onTabChanged}
                  aria-label="Validation builder tabs"
                >
                  <Tab label="Schema" />
                  <Tab label="Test" />
                </Tabs>
              </Paper>
              <div className={classes.bodyRightContent}>
                <TabPanel value={selectedTab} index={0} keepChildren>
                  <CodeEditor name='output' mode='javascript' value={code} dimensions={{ Width: VSplit, SelectedTab: selectedTab }} highlightActiveLine={false} readOnly showPrintMargin={true} />
                </TabPanel>
                <TabPanel value={selectedTab} index={1} keepChildren>
                  <CodeEditor name='testdata' mode={testDataJson ? 'json' : 'text'} value={testData} onChange={this.onTestDataChanged} dimensions={{ Width: VSplit, SelectedTab: selectedTab }} highlightActiveLine={false} showPrintMargin={false} />
                </TabPanel>
              </div>
            </div>
          </SplitPane>
        </div>
      </div>
      <Dialog
        open={testDisplay}
        onClose={this.onTestDisplayClosed}
        scroll='paper'
      >
        <DialogTitle id="test-results-title">Test Results</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            tabIndex={-1}
          >
            {_.map(testResults, (tr) => <Alert severity='warning'>
              {tr.Field ? <AlertTitle>{tr.Field}</AlertTitle> : null }
              {tr.Message}
            </Alert>)
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onTestDisplayClosed} color="primary">
              Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  }
}

export const ValidationBuilder = compose(
  WithRedux(),
  withStyles(styles)
)(ValidationBuilderPlain)
