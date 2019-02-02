const initialState = {
  loaded: false,
  data: {}
}
const changeSecret = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SECRET_DETAILS':
      return action.payload
    case 'CHANGE_SECRET':
      return { loaded: true, data: action.payload }
    default:
      return state
  }
}

export default changeSecret
