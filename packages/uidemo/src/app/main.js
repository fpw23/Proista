import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import lightTheme from './Theme/light'
import { SnackbarProvider } from 'notistack'
import { store } from './store'
import { Provider as ReduxProvider } from 'react-redux'
import { globalHistory } from '@reach/router'
import { DrawerManager } from '@proista/client-ui-material/lib/Controls/Core/DrawerManager'
import { SnackbarUtilsConfigurator } from '@proista/client-ui-material/lib/Tools/SnackbarUtilsConfigurator'
import { CatchError } from '@proista/client/lib/Controls/Core/CatchError'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { ah as RActions } from '@proista/client/lib/Data/Router/Types'
import { compose } from '@proista/client-tools/lib/index'
import { hot } from 'react-hot-loader/root'
import { App } from './app'
import { InitMessageBus } from '@proista/client/lib/Tools/index'
import CssBaseline from '@material-ui/core/CssBaseline'

// eslint-disable-next-line no-unused-vars
const busRef = InitMessageBus()

class MainPlain extends React.Component {
  onRouteChanged = (history) => {
    const { RouterSetNewLocation } = this.props
    RouterSetNewLocation(history.location.pathname, history.location.search, history.location.hash)
  }

  componentDidMount () {
    this.historyUnsubscribe = globalHistory.listen(this.onRouteChanged)
    this.onRouteChanged(window)
  }

  componentWillUnmount () {
    this.historyUnsubscribe()
  }

  render () {
    return (
      <React.Fragment>
        <CatchError>
          <CssBaseline />
          <App />
          <DrawerManager />
        </CatchError>
      </React.Fragment>
    )
  }
}

const Main = compose(
  hot,
  WithRedux(
    [],
    [RActions.SetNewLocation]
  )

)(MainPlain)

ReactDOM.render(
  <ReduxProvider store={store}>
    <ThemeProvider theme={lightTheme}>
      <SnackbarProvider maxSnack={5} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}>
        <SnackbarUtilsConfigurator />
        <Main />
      </SnackbarProvider>
    </ThemeProvider>
  </ReduxProvider>
  , document.getElementById('content'))
