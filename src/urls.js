export function urlChangePassword () {
  return `/base_auth/change_password/`
}

export function urlSessions () {
  return `/api/settings/session_map/`
}

export function urlDeleteSession (id) {
  return `${urlSessions()}${id}/`
}
