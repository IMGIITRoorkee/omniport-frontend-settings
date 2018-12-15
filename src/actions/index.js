import axios from 'axios'

import { urlWhoAmI, getCookie } from 'formula_one'
import { urlChangePassword, urlSessions, urlDeleteSession } from '../urls'

export const setUser = () => {
  return dispatch => {
    axios
      .get(urlWhoAmI())
      .then(res => {
        dispatch({
          type: 'SET_USER',
          payload: { loaded: true, data: res.data }
        })
      })
      .catch(err => {})
  }
}

export const initialiseChangePassword = () => {
  return dispatch => {
    dispatch({
      type: 'INITIALISE_CHANGE_PASSWORD'
    })
  }
}

export const submitChangePassword = data => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    axios
      .post(urlChangePassword(), data, { headers: headers })
      .then(res => {
        dispatch({
          type: 'SET_CHANGE_PASSWORD',
          payload: {
            active: true,
            type: 'success',
            data: [
              'Password changed successfuly',
              'You will be redirected to login page in 5 seconds'
            ]
          }
        })
      })
      .catch(err => {
        dispatch({
          type: 'SET_CHANGE_PASSWORD',
          payload: {
            active: true,
            type: 'error',
            data: err.response.data.errors.oldPassword
          }
        })
      })
  }
}

export const setSessionList = () => {
  return dispatch => {
    axios
      .get(urlSessions())
      .then(res => {
        dispatch({
          type: 'INITIALISE_SESSIONS',
          payload: { loaded: true, data: res.data }
        })
      })
      .catch(err => {
        dispatch({
          type: 'INITIALISE_SESSIONS',
          payload: { loaded: true, data: [] }
        })
      })
  }
}

export const deleteSession = id => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    axios
      .delete(urlDeleteSession(id), { headers: headers })
      .then(res => {
        dispatch({
          type: 'SIGN_OUT_SESSION',
          payload: id
        })
      })
      .catch(err => {
        console.log('Erro', err)
      })
  }
}
