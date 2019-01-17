import React from 'react'

import Field from './field'

export default class ReadField extends React.PureComponent {
  render () {
    const { field, value } = this.props
    const { required, label } = field
    return <Field label={label} field={value} required={required} />
  }
}
