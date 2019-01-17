import React from 'react'
import { DateInput } from 'semantic-ui-calendar-react'

import Field from './field'

export default class DateField extends React.PureComponent {
  render () {
    const { name, field, value, handleChange, error } = this.props
    const { required, label, maxLength } = field
    return (
      <Field
        field={
          <DateInput
            id={name}
            name={name}
            placeholder={label}
            value={value}
            maxLength={maxLength}
            onChange={(e, { name, value }) => handleChange(name, value)}
            iconPosition='left'
          />
        }
        label={label}
        required={required}
        error={error}
      />
    )
  }
}
