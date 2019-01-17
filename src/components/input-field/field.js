import React from 'react'
import { Grid, Form } from 'semantic-ui-react'

import '../../css/field.css'

export default class Field extends React.PureComponent {
  render () {
    const { name, field, error, label, required } = this.props
    return (
      <React.Fragment>
        <Grid.Row
          as={Form.Field}
          required={required}
          error={error}
          styleName='field-container'
        >
          <Grid.Column
            width={4}
            as='label'
            htmlFor={name}
            verticalAlign='middle'
          >
            {label}
          </Grid.Column>
          <Grid.Column width={6}>{field}</Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}
