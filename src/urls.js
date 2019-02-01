import config from '../config.json'

// Frontend URLs
export function appBaseURL () {
  return config.baseUrl
}

export function urlAppNavigation (key) {
  return `${appBaseURL()}/${key}`
}

// Backend URLs
export function urlSettingsBase () {
  return `/api/settings/`
}

// A generic URL for all settings modal
export function urlSettingsInformational (setting) {
  return `${urlSettingsBase()}${setting}_information/`
}

export function urlChangePassword () {
  return `${urlSettingsBase()}/change_password/`
}

export function urlSessions () {
  return `${urlSettingsBase()}session_map/`
}

export function urlDeleteSession (id) {
  return `${urlSessions()}${id}/`
}
