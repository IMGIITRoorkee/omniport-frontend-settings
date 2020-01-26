const initialState = {
  loaded: false,
  data: []
}

const notificationCategoryList = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALISE_NOTIFICATION_CATEGORY_LIST':
      return action.payload
    default:
      return state
  }
}

export default notificationCategoryList
