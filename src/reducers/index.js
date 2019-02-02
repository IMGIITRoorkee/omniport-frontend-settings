import { combineReducers } from 'redux'
import changePassword from './changePassword'
import changeSecret from './changeSecret'
import manageSessions from './manageSessions'
import whoAmI from './whoAmI'
import financialSettings from './financialSettings'
import biologicalSettings from './biologicalSettings'
import politicalSettings from './politicalSettings'
import residentialSettings from './residentialSettings'

const rootReducers = combineReducers({
  changePassword,
  changeSecret,
  manageSessions,
  whoAmI,
  financialSettings,
  politicalSettings,
  biologicalSettings,
  residentialSettings
})

export default rootReducers
