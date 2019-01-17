import React from 'react'
import { Form } from 'semantic-ui-react'

import Field from './field'

export default class IntegerField extends React.PureComponent {
  render () {
    const { name, field, value, handleChange, error } = this.props
    const { required, label, maxValue, minValue } = field
    return (
      <Field
        field={
          <Form.Input
            type='number'
            id={name}
            name={name}
            placeholder={label}
            value={value}
            maxvalue={maxValue}
            minvalue={minValue}
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
