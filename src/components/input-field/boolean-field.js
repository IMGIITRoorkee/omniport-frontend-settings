import React from 'react'
import { Checkbox } from 'semantic-ui-react'

import Field from './field'

export default class BooleanField extends React.PureComponent {
  render () {
    const { name, field, checked, handleChange, error } = this.props
    const { required, label } = field
    return (
      <Field
        field={
          <Checkbox
            id={name}
            name={name}
            checked={checked}
            onChange={(e, { name, checked }) => handleChange(name, checked)}
            toggle
          />
        }
        label={label}
        required={required}
        error={error}
      />
    )
  }
}
