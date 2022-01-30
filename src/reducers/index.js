import { combineReducers } from 'redux'
import changePassword from './changePassword'
import changeSecret from './changeSecret'
import manageSessions from './manageSessions'
import whoAmI from './whoAmI'
import financialSettings from './financialSettings'
import biologicalSettings from './biologicalSettings'
import contactSettings from './contactSettings'
import politicalSettings from './politicalSettings'
import residentialSettings from './residentialSettings'
import subscriptionCategoryList from './subscriptionCategoryList'

const rootReducers = combineReducers({
  changePassword,
  changeSecret,
  manageSessions,
  whoAmI,
  financialSettings,
  politicalSettings,
  biologicalSettings,
  contactSettings,
  residentialSettings,
  subscriptionCategoryList
})

export default rootReducers
