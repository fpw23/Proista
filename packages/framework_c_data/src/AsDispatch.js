export function AsDispatch (action) {
  return function (dispatch) {
    return function () {
      dispatch(action(...arguments))
    }
  }
}
