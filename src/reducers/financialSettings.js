const settingType = 'FINANCIAL'
const initialState = {
  optionsLoaded: false,
  optoins: {},
  dataLoaded: false,
  data: {}
}

const financialSettings = (state = initialState, action) => {
  switch (action.type) {
    case `SET_OPTIONS_${settingType}`:
      return action.payload
    case `SET_DATA_${settingType}`:
      return {
        ...state,
        dataLoaded: action.payload.dataLoaded,
        data: action.payload.data
      }
    case `CHANGE_DATA_${settingType}`:
      return {
        ...state,
        data: action.payload.data
      }
    default:
      return state
  }
}

export default financialSettings
