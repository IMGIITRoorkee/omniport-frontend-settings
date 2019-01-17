/**
 *
 * @param {object} options - Options object from API
 * @param {object} state - State object through which data is to be extracted
 * @returns {object} - Data to send with patch request
 */
export function convertStateToData (options, state) {
  let data = {}
  Object.keys(options).map(option => {
    if (!options[option].readOnly) {
      data[option] = state[option]
    }
  })
  return data
}

/**
 *
 * @param {object} errorObject - Error object
 * @param {string} field - Field name to be checked
 * @returns {boolean} - Boolean value returning if there is an error in the field
 */
export function errorExist (errorObject, field) {
  return Boolean(
    Object.keys(errorObject).find(x => {
      return x === field
    })
  )
}
