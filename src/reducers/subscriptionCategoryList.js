const initialState = {
  loaded: false,
  data: [],
  count: 0
}

const subscriptionCategoryList = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CATEGORY_LIST':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default subscriptionCategoryList
