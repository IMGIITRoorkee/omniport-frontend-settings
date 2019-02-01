import { combineReducers } from 'redux'
import changePassword from './changePassword'
import manageSessions from './manageSessions'
import whoAmI from './whoAmI'
import financialSettings from './financialSettings'
import biologicalSettings from './biologicalSettings'
import politicalSettings from './politicalSettings'
import residentialSettings from './residentialSettings'

const rootReducers = combineReducers({
  changePassword,
  manageSessions,
  whoAmI,
  financialSettings,
  politicalSettings,
  biologicalSettings,
  residentialSettings
})

export default rootReducers
