const settingType = "RESIDENTIAL";
const initialState = {
  optionsLoaded: false,
  optoins: {},
  dataLoaded: false,
  data: {}
};

const emailSubcriptions = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_EMAIL_SUBSCRIPTION":
      return {
        ...state,
        data: action.payload.data
      };
    default:
      return state;
  }
};

export default emailSubcriptions;
