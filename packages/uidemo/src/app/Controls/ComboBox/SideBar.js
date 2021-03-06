import React from 'react'
import { SideBarList, SideBarLink, SideBarBackLink } from '@proista/client-ui-material/lib/Controls/Layouts/Lovey/index'

export class SideBar extends React.Component {
  render () {
    const { relativePath } = this.props
    return <SideBarList>
      <SideBarLink title='Basic' to='ComboBox/Basic' relativePath={relativePath} />
      <SideBarLink title='Filters' to='ComboBox/Filters' relativePath={relativePath} />
      <SideBarLink title='Filters (Initial Values)' to='ComboBox/FiltersInitialValues' relativePath={relativePath} />
      <SideBarLink title='Grouping' to='ComboBox/Grouping' relativePath={relativePath} />
      <SideBarBackLink noIcon relativePath={relativePath} />
    </SideBarList>
  }
}
