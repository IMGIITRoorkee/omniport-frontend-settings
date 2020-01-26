import config from '../config.json'

// Frontend URLs
export function appBaseURL () {
  return config.baseUrl
}

export function urlAppNavigation (key) {
  return `${appBaseURL()}/${key}`
}

export function urlLogin () {
  return '/auth/login'
}

// Backend URLs
export function urlSettingsBase () {
  return `/api/settings/`
}

export function urlChangeProfile () {
  return `${urlSettingsBase()}display_picture/`
}

// A generic URL for all settings modal
export function urlSettingsInformational (setting) {
  return `${urlSettingsBase()}${setting}_information/`
}

export function urlChangePassword () {
  return `${urlSettingsBase()}change_password/`
}

export function urlChangeSecret () {
  return `${urlSettingsBase()}change_secrets/`
}

export function urlSessions () {
  return `${urlSettingsBase()}session_map/`
}

export function urlDeleteSession (id) {
  return `${urlSessions()}${id}/`
}

export function urlSubscriptionTree () {
  return `/api/categories/subscription_tree/`
}

export function paramSubscriptionNotification () {
  return 'notifications'
}
