const initialState = {
  loading: false,
  message: {
    active: '',
    type: '',
    data: []
  }
}
const changePassword = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALISE_CHANGE_PASSWORD':
      return initialState
    case 'SET_CHANGE_PASSWORD':
      return action.payload
    default:
      return state
  }
}

export default changePassword
