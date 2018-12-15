const initialState = {
  loading: false,
  data: []
}

const manageSessions = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALISE_SESSIONS':
      return action.payload
    case 'SIGN_OUT_SESSION':
      return {
        loaded: true,
        data: state.data.filter(obj => obj.id !== action.payload)
      }
    default:
      return state
  }
}

export default manageSessions
