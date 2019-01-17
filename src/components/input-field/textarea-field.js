import React from 'react'
import { Form } from 'semantic-ui-react'

import Field from './field'

export default class TextAreaField extends React.PureComponent {
  render () {
    const { name, field, value, handleChange, error } = this.props
    const { required, label } = field
    return (
      <Field
        field={
          <Form.TextArea
            id={name}
            name={name}
            placeholder={label}
            value={value}
            onChange={e => handleChange(e.target.name, e.target.value)}
            autoHeight
            rows={2}
          />
        }
        label={label}
        required={required}
        error={error}
      />
    )
  }
}
