import axios from 'axios'
import { toast } from 'react-semantic-toasts'

import { urlWhoAmI, getCookie } from 'formula_one'
import {
  urlChangeProfile,
  urlChangePassword,
  urlChangeSecret,
  urlSessions,
  urlDeleteSession,
  urlSettingsInformational,
  urlSubscriptionTree,
  paramSubscriptionNotification,
} from '../urls'

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
      .catch(() => {
        toast({
          type: 'error',
          title: 'Error',
          description: 'Some error occured while setting up the user',
          animation: 'fade up',
          icon: 'frown up',
          time: 3000
        })
      })
  }
}

export const setSecret = (successCallback, errCallback) => {
  return dispatch => {
    axios
      .get(urlChangeSecret())
      .then(res => {
        dispatch({
          type: 'CHANGE_SECRET',
          payload: res.data
        })
        successCallback(res)
      })
      .catch(err => {
        errCallback(err)
      })
  }
}

export const changeSecret = (data, successCallback, errCallback) => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    axios
      .post(urlChangeSecret(), data, { headers: headers })
      .then(res => {
        dispatch({
          type: 'CHANGE_SECRET',
          payload: res.data
        })
        successCallback(res)
      })
      .catch(err => {
        errCallback(err)
      })
  }
}

export const setDisplayPicture = (formData, successCallback, errCallback) => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    axios
      .put(urlChangeProfile(), formData, { headers: headers })
      .then(res => {
        dispatch({
          type: 'UPDATE_PROFILE_PICTURE',
          payload: res.data.displayPicture
        })
        successCallback(res)
      })
      .catch(err => {
        errCallback(err)
      })
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
      .catch(() => {
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
      .catch(() => {
        toast({
          type: 'error',
          title: 'Error',
          description: 'Session was not logged out',
          animation: 'fade up',
          icon: 'frown up',
          time: 3000
        })
      })
  }
}

export const setOptions = (settingType, successCallback, errCallback) => {
  return dispatch => {
    axios
      .options(urlSettingsInformational(settingType))
      .then(res => {
        dispatch({
          type: `SET_OPTIONS_${settingType.toUpperCase()}`,
          payload: {
            optionsLoaded: true,
            options: res.data.actions.PUT,
            dataLoaded: false,
            data: {}
          }
        })
        successCallback(res)
      })
      .catch(err => {
        errCallback(err)
      })
  }
}

export const setData = (settingType, successCallback, errCallback) => {
  return dispatch => {
    axios
      .get(urlSettingsInformational(settingType))
      .then(res => {
        dispatch({
          type: `SET_DATA_${settingType.toUpperCase()}`,
          payload: {
            dataLoaded: true,
            data: res.data
          }
        })
        successCallback(res)
      })
      .catch(err => {
        errCallback(err)
      })
  }
}

export const changeData = (settingType, data, successCallback, errCallback) => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    axios
      .patch(urlSettingsInformational(settingType), data, { headers: headers })
      .then(res => {
        dispatch({
          type: `SET_DATA_${settingType.toUpperCase()}`,
          payload: {
            dataLoaded: true,
            data: res.data
          }
        })
        successCallback(res)
      })
      .catch(err => {
        errCallback(err)
      })
  }
}

export const getNotificationCategoryList = () => {
  return dispatch => {
    axios
      .get(urlSubscriptionTree(), {
        params: {
          action: paramSubscriptionNotification()
        }
      })
      .then(res => {
        dispatch({
          type: 'INITIALISE_NOTIFICATION_CATEGORY_LIST',
          payload: { loaded: true, data: res.data.results }
        })
      })
      .catch(err => {
        dispatch({
          type: 'INITIALISE_NOTIFICATION_CATEGORY_LIST',
          payload: { loaded: true, data: [] }
        })
      })
  }
}
