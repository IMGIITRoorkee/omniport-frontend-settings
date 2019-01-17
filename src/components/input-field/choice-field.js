import React from 'react'
import { Dropdown } from 'semantic-ui-react'

import Field from './field'

export default class BooleanField extends React.PureComponent {
  render () {
    const { name, field, value, handleChange, options, error } = this.props
    const { required, label } = field
    return (
      <Field
        field={
          <Dropdown
            id={name}
            name={name}
            placeholder={label}
            value={value}
            options={options}
            onChange={(e, { name, value }) => handleChange(name, value)}
            selection
            search
            fluid
          />
        }
        label={label}
        required={required}
        error={error}
      />
    )
  }
}
