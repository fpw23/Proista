
import { createMuiTheme } from '@material-ui/core/styles'

const palette = {
  primary: { main: '#1E1E1E' },
  secondary: { main: '#FFAF06' }
}
const themeName = 'Proista Light'

export default createMuiTheme({
  palette,
  themeName,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: 'rgb(250, 250, 250)'
        }
      }
    }
  }
})
