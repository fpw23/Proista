import React from 'react'
import { SideBarList, SideBarLink, SideBarBackLink } from '@proista/client-ui-material/lib/Controls/Layouts/Lovey/index'

export class SideBar extends React.Component {
  render () {
    const { relativePath } = this.props
    return <SideBarList>
      <SideBarLink title='Basic' to='TransferListBox/Basic' relativePath={relativePath} />
      <SideBarLink title='Grouping' to='TransferListBox/Grouping' relativePath={relativePath} />
      <SideBarBackLink noIcon relativePath={relativePath} />
    </SideBarList>
  }
}
