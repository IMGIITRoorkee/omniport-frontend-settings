import React from 'react'
import { Form } from 'semantic-ui-react'

import Field from './field'

export default class DecimalField extends React.PureComponent {
  render () {
    const { name, field, value, handleChange, error } = this.props
    const { required, label } = field
    return (
      <Field
        field={
          <Form.Input
            type='number'
            step='any'
            id={name}
            name={name}
            placeholder={label}
            value={value}
            onChange={(e, { name, value }) => handleChange(name, value)}
          />
        }
        label={label}
        required={required}
        error={error}
      />
    )
  }
}
