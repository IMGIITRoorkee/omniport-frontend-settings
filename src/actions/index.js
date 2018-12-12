import axios from 'axios'

import { getCookie } from 'formula_one'
import { urlChangePassword } from '../urls'

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
