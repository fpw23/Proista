import React from 'react'
import { compose } from '@proista/client-tools/lib/index'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { withStyles } from '@material-ui/core/styles'
import { withSnackbar } from 'notistack'
import { DrawerStandardStyles, TabPanel } from '@proista/client-ui-material/lib/Controls/Core'
import IconButton from '@material-ui/core/IconButton'
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
import { ValidationBuilderEditor } from './Editor/ValidationBuilderEditor'
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
    const { selectedTab } = this.state
    const { close } = this.props

    switch (selectedTab) {
      case 1:
        ret.push({ onClick: this.onFormatSchema, label: 'Format', icon: <FormatAlignLeftIcon /> })
        break
    }

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
    const { selectedTab, VSplit = 0, xml, code, actions = [] } = this.state

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

                </TabPanel>
              </div>
            </div>
          </SplitPane>
        </div>
      </div>
    </div>
  }
}

export const ValidationBuilder = compose(
  WithRedux(),
  withStyles(styles),
  withSnackbar
)(ValidationBuilderPlain)
