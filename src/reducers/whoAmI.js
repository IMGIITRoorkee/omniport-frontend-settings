const initialState = {
  loaded: false,
  data: {}
}

const whoAmI = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'UPDATE_PROFILE_PICTURE':
      return {
        ...state,
        data: { ...state.data, displayPicture: action.payload }
      }
    default:
      return state
  }
}
export default whoAmI
