import React from 'react'
import { compose } from '@proista/client-tools/lib/index'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { withStyles } from '@material-ui/core/styles'
import { DrawerStandardStyles, TabPanel } from '@proista/client-ui-material/lib/Controls/Core'
import { withSnackbar } from 'notistack'
import { DynamicFormBox } from '@proista/client-ui-material/lib/Controls/Forms'
import IconButton from '@material-ui/core/IconButton'
import BugReportIcon from '@material-ui/icons/BugReport'
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import SplitPane from 'react-split-pane'
import CloseIcon from '@material-ui/icons/Close'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import clsx from 'clsx'
import _ from 'lodash'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import { FormBuilderEditor } from './Editor/FormBuilderEditor'
import { CodeEditor } from '@proista/client-ui-material/lib/Controls/Editors/CodeEditor'

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
  bodyPreview: {
    padding: theme.spacing(2)
  },
  bodyEditor: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  bodyEditorTabs: {
    height: 'max-content'
  },
  bodyEditorContent: {
    flexGrow: 1,
    height: '100%'
  }
})

export class FormBuilderPlain extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      VSplit: 0,
      selectedTab: 0,
      code: '[]',
      xml: '',
      actions: []
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
    const { selectedTab, debugMode = false } = this.state
    const { close } = this.props

    switch (selectedTab) {
      case 1:
        ret.push({ onClick: this.onFormatSchema, label: 'Format', icon: <FormatAlignLeftIcon /> })
        break
    }

    ret.push({ onClick: this.onDebugModeChanged, label: debugMode === true ? 'Turn Debug Mode Off' : 'Turn Debug Mode On', icon: debugMode === true ? <BugReportIcon /> : <BugReportOutlinedIcon /> })
    ret.push({ onClick: close, label: 'Close', icon: <CloseIcon /> })

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

  onDebugModeChanged = () => {
    this.setState((state) => ({
      debugMode: !state.debugMode
    }), () => {
      this.setState({
        actions: this.buildActions()
      })
    })
  }

  onFormatSchema = () => {
    const { code } = this.state

    try {
      const codeAsJson = JSON.parse(code)
      const newCode = JSON.stringify(codeAsJson, null, '\t')
      this.setState({
        code: newCode
      })
    } catch (err) {
      const { enqueueSnackbar } = this.props
      enqueueSnackbar(err.message, {
        variant: 'error'
      })
    }
  }

  onEditorChanged = (code, xml) => {
    this.setState({
      code: code,
      xml: xml
    })
  }

  renderActions = (actions = [], classes) => {
    return _.map(actions, (a) => <IconButton key={a.label} onClick={a.onClick} aria-label={a.label} className={classes.actionButton} component="span">
      {a.icon}
    </IconButton>)
  }

  render () {
    const { classes } = this.props
    const { selectedTab, VSplit = 0, xml, code, actions = [], debugMode = false } = this.state

    return <div id='frmBuilder' className={clsx(classes.wrapper, classes.HFull)}>
      <div className={classes.root}>
        <div className={classes.topBar}>
          <AppBar color='secondary' position='relative'>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Form Builder
              </Typography>
              {this.renderActions(actions, classes)}
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.body}>
          <SplitPane pane1Style={{ overflow: 'auto' }} split="vertical" onDragFinished={this.onSplitResize.bind(this, 'V')} minSize={'100px'} defaultSize={'60%'}>
            <div className={classes.bodyPreview}>
              <DynamicFormBox debugMode={debugMode} form={'FormBuilderPreview'} definition={code} />
            </div>
            <div className={classes.bodyEditor}>
              <Paper className={classes.bodyEditorTabs} square>
                <Tabs
                  value={selectedTab}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={this.onTabChanged}
                  aria-label="Form builder tabs"
                >
                  <Tab label="Editor" />
                  <Tab label="Schema" />
                </Tabs>
              </Paper>
              <div className={classes.bodyEditorContent}>
                <TabPanel value={selectedTab} index={0} keepChildren>
                  <FormBuilderEditor designXML={xml} onChange={this.onEditorChanged} dimensions={{ Width: VSplit, SelectedTab: selectedTab }} containerId='#frmBuilder' />
                </TabPanel>
                <TabPanel value={selectedTab} index={1} keepChildren>
                  <CodeEditor name='output' mode='json' value={code} dimensions={{ Width: VSplit, SelectedTab: selectedTab }} highlightActiveLine={false} readOnly showPrintMargin={false} />
                </TabPanel>
              </div>
            </div>
          </SplitPane>
        </div>
      </div>
    </div>
  }
}

export const FormBuilder = compose(
  WithRedux(),
  withStyles(styles),
  withSnackbar
)(FormBuilderPlain)
