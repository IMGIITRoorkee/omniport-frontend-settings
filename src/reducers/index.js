import { combineReducers } from 'redux'
import changePassword from './changePassword'
import manageSessions from './manageSessions'
import whoAmI from './whoAmI'

const rootReducers = combineReducers({
  changePassword,
  manageSessions,
  whoAmI
})

export default rootReducers
