import React from 'react'
import { Form } from 'semantic-ui-react'

import Field from './field'

export default class EmailField extends React.PureComponent {
  render () {
    const { name, field, value, handleChange, error } = this.props
    const { required, label, maxLength } = field
    return (
      <Field
        field={
          <Form.Input
            type='email'
            id={name}
            name={name}
            placeholder={label}
            value={value}
            maxLength={maxLength}
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
