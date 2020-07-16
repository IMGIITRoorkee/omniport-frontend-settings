const initialState = {
  loaded: false,
  data: []
}

const subscriptionCategoryList = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALISE_CATEGORY_LIST':
      return action.payload
    default:
      return state
  }
}

export default subscriptionCategoryList
