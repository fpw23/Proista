import React from 'react'
import { SideBarList, SideBarLink, SideBarBackLink } from '@proista/client-ui-material/lib/Controls/Layouts/Lovey/index'

export class SideBar extends React.Component {
  render () {
    const { relativePath } = this.props
    return <SideBarList>
      <SideBarLink title='Basic' to='FormBox/Basic' relativePath={relativePath} />
      <SideBarLink title='Validation' to='FormBox/Validation' relativePath={relativePath} />
      <SideBarLink title='With Header' to='FormBox/WithHeader' relativePath={relativePath} />
      <SideBarLink title='Dynamic' to='FormBox/Dynamic' relativePath={relativePath} />
      <SideBarLink title='Submit' to='FormBox/Submit' relativePath={relativePath} />
      <SideBarBackLink noIcon relativePath={relativePath} />
    </SideBarList>
  }
}
