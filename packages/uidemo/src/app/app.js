import React from 'react'
import { Layout, SideBarList, SideBarLink } from '@proista/client-ui-material/lib/Controls/Layouts/Lovey/index'
import { UnknownRoute, IndexRoute } from '@proista/client/lib/Controls/Core/index'
import { ah as RActions } from '@proista/client/lib/Data/Router/Types'
import { compose } from '@proista/client-tools/lib/index'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { withStyles } from '@material-ui/core'
import { Router } from '@reach/router'
import { Tools } from './Tools/Tools'
import * as TB from './Controls/TextBox/index'
import * as FB from './Controls/FormBox/index'
import * as B from './Controls/Button/index'
import * as CBO from './Controls/ComboBox/index'
import * as CB from './Controls/CheckBox/index'
import * as CLB from './Controls/CheckListBox/index'
import * as D from './Controls/Drawers/index'
import * as NB from './Controls/NumberBox/index'
import * as SN from './Controls/Notifications/index'
import * as TL from './Controls/TransferListBox/index'
import * as DB from './Controls/DateBox/index'

const styles = (theme) => {
  return {
    root: {
      padding: '20px'
    }
  }
}

class AppSideBar extends React.Component {
  render () {
    const { relativePath } = this.props
    return <SideBarList>
      <SideBarLink title='Tools' to='/Tools' relativePath={relativePath} />
      <SideBarLink title='Form Box' to='/FormBox' relativePath={relativePath} />
      <SideBarLink title='Text Box' to='/TextBox' relativePath={relativePath} />
      <SideBarLink title='Date Box' to='/DateBox' relativePath={relativePath} />
      <SideBarLink title='Combo Box' to='/ComboBox' relativePath={relativePath} />
      <SideBarLink title='Check Box' to='/CheckBox' relativePath={relativePath} />
      <SideBarLink title='Check List Box' to='/CheckListBox' relativePath={relativePath} />
      <SideBarLink title='Number Box' to='/NumberBox' relativePath={relativePath} />
      <SideBarLink title='Button' to='/Button' relativePath={relativePath} />
      <SideBarLink title='Drawer' to='/Drawer' relativePath={relativePath} />
      <SideBarLink title='Notifications' to='/Notifications' relativePath={relativePath} />
      <SideBarLink title='Transfer List Box' to='/TransferListBox' relativePath={relativePath} />
    </SideBarList>
  }
}

export class AppPlain extends React.Component {
  componentDidMount () {
    const { RouterAddPathName } = this.props
    RouterAddPathName('TextBox', 'Text Box')
    RouterAddPathName('DateBox', 'Date Box')
    RouterAddPathName('ComboBox', 'Combo Box')
    RouterAddPathName('FormBox', 'Form Box')
    RouterAddPathName('CheckBox', 'Check Box')
    RouterAddPathName('CheckListBox', 'Check List Box')
    RouterAddPathName('NumberBox', 'Number Box')
    RouterAddPathName('WithHeader', 'With Header')
    RouterAddPathName('WithTime', 'With Time')
    RouterAddPathName('TransferListBox', 'Transfer List Box')
    RouterAddPathName('InitialValues', 'Initial Values')
  }

  renderSideBar = () => {
    const { uri } = this.props
    return (
      <Router>
        <AppSideBar default relativePath={uri} />
        <TB.SideBar path='TextBox/*' relativePath={uri} />
        <DB.SideBar path='DateBox/*' relativePath={uri} />
        <FB.SideBar path='FormBox/*' relativePath={uri} />
        <CBO.SideBar path='ComboBox/*' relativePath={uri} />
        <CB.SideBar path='CheckBox/*' relativePath={uri} />
        <CLB.SideBar path='CheckListBox/*' relativePath={uri} />
        <NB.SideBar path='NumberBox/*' relativePath={uri} />
        <B.SideBar path='Button/*' relativePath={uri} />
        <D.SideBar path='Drawer/*' relativePath={uri} />
        <SN.SideBar path='Notifications/*' relativePath={uri} />
        <TL.SideBar path='TransferListBox/*' relativePath={uri} />
      </Router>
    )
  }

  render () {
    const { classes } = this.props

    return (
      <Layout sideBar={this.renderSideBar} logoPath='/content/images/LogoWithText.png'>
        <div className={classes.root}>
          <Router>
            {/* Tools */}
            <IndexRoute path='/' to='./Tools' />
            <Tools path='Tools' />
            {/* Text Box */}
            <IndexRoute path='TextBox' to='./Basic' />
            <TB.TextBoxBasic path='TextBox/Basic' />
            <TB.TextBoxDebounce path='TextBox/Debounce' />
            {/* Date Box */}
            <IndexRoute path='DateBox' to='./Basic' />
            <DB.DateBoxBasic path='DateBox/Basic' />
            <DB.DateBoxWithTime path='DateBox/WithTime' />
            {/* Combo Box */}
            <IndexRoute path='ComboBox' to='./Basic' />
            <CBO.ComboBoxBasic path='ComboBox/Basic' />
            <CBO.ComboBoxFilters path='ComboBox/Filters' />
            <CBO.ComboBoxFiltersInitialValues path='ComboBox/FiltersInitialValues' />
            <CBO.ComboBoxGrouping path='ComboBox/Grouping' />
            {/* Check Box */}
            <IndexRoute path='CheckBox' to='./Basic' />
            <CB.CheckBoxBasic path='CheckBox/Basic' />
            {/* Check List Box */}
            <IndexRoute path='CheckListBox' to='./Basic' />
            <CLB.Basic path='CheckListBox/Basic' />
            <CLB.InitialValues path='CheckListBox/InitialValues' />
            {/* Number Box */}
            <IndexRoute path='NumberBox' to='./Basic' />
            <NB.NumberBoxBasic path='NumberBox/Basic' />
            {/* Form Box */}
            <IndexRoute path='FormBox' to='./Basic' />
            <FB.FormBoxBasic path='FormBox/Basic' />
            <FB.FormBoxValidation path='FormBox/Validation' />
            <FB.FormBoxHeader path='FormBox/WithHeader' />
            <FB.FormBoxDynamic path='FormBox/Dynamic' />
            <FB.FormBoxSubmit path='FormBox/Submit' />
            {/* Button */}
            <IndexRoute path='Button' to='./Basic' />
            <B.ButtonBasic path='Button/Basic' />
            {/* Drawer */}
            <IndexRoute path='Drawer' to='./Basic' />
            <D.DrawerBasic path='Drawer/Basic' />
            {/* Notifications */}
            <IndexRoute path='Notifications' to='./Basic' />
            <SN.Basic path='Notifications/Basic' />
            {/* TransferListBox */}
            <IndexRoute path='TransferListBox' to='./Basic' />
            <TL.Basic path='TransferListBox/Basic' />
            <TL.Grouping path='TransferListBox/Grouping' />
            <TL.InitialValues path='TransferListBox/InitialValues' />
            {/* Unknown */}
            <UnknownRoute default />
          </Router>
        </div>
      </Layout>
    )
  }
}

export const App = compose(
  WithRedux([], [RActions.AddPathName]),
  withStyles(styles)
)(AppPlain)
