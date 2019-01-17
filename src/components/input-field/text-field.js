import React from 'react'
import { Form } from 'semantic-ui-react'

import Field from './field'

export default class TextField extends React.PureComponent {
  render () {
    const { name, field, value, handleChange, error = { error } } = this.props
    const { required, label, maxLength } = field
    return (
      <Field
        field={
          <Form.Input
            id={name}
            name={name}
            placeholder={label}
            value={value}
            maxLength={maxLength}
            onChange={(e, { name, value }) => handleChange(name, value)}
          />
        }
        label={label}
        error={error}
        required={required}
      />
    )
  }
}
