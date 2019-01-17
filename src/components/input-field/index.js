import React from 'react'

import BooleanField from './boolean-field'
import ChoiceField from './choice-field'
import DateField from './date-field'
import DecimalField from './decimal-field'
import EmailField from './email-field'
import IntegerField from './integer-field'
import NoField from './no-field'
import ReadField from './read-field'
import TextAreaField from './textarea-field'
import TextField from './text-field'

export default class InputField extends React.PureComponent {
  renderField = () => {
    const { field, name, handleChange, value, error } = this.props
    const { type, maxLength, minValue, maxValue, readOnly } = field
    if (readOnly) {
      return (
        // Read only field
        <ReadField
          field={field}
          name={name}
          handleChange={handleChange}
          value={value}
          error={error}
        />
      )
    }
    switch (type) {
      case 'string':
        if (maxLength) {
          // Input type text
          return (
            <TextField
              field={field}
              name={name}
              handleChange={handleChange}
              value={value}
              error={error}
            />
          )
        } else {
          // Input type textarea
          return (
            <TextAreaField
              field={field}
              name={name}
              handleChange={handleChange}
              value={value}
              error={error}
            />
          )
        }
      case 'email':
        // Input type email
        return (
          <EmailField
            field={field}
            name={name}
            handleChange={handleChange}
            value={value}
            error={error}
          />
        )
      case 'boolean':
        // Input type checkbox
        return (
          <BooleanField
            field={field}
            name={name}
            handleChange={handleChange}
            checked={value}
            error={error}
          />
        )
      case 'integer':
        // Input type number
        return (
          <IntegerField
            field={field}
            name={name}
            handleChange={handleChange}
            value={value}
            minValue={minValue}
            maxValue={maxValue}
            error={error}
          />
        )
      case 'decimal':
        // Input type number with step equals to any
        return (
          <DecimalField
            field={field}
            name={name}
            handleChange={handleChange}
            value={value}
            error={error}
          />
        )
      case 'choice':
        // Input type options
        return (
          <ChoiceField
            field={field}
            name={name}
            handleChange={handleChange}
            value={value}
            options={field.choices.map(choice => {
              return {
                key: choice.value,
                value: choice.value,
                text: choice.displayName
              }
            })}
            error={error}
          />
        )

      case 'date':
        // Input type date
        return (
          <DateField
            field={field}
            name={name}
            handleChange={handleChange}
            value={value}
            error={error}
          />
        )
      default:
        // Default no support field
        return (
          <NoField
            field={field}
            name={name}
            handleChange={handleChange}
            value={value}
            error={error}
          />
        )
    }
  }
  render () {
    return this.renderField()
  }
}
