import React from 'react'
import { Grid, Form } from 'semantic-ui-react'

export default class PasswordField extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <Grid.Row as={Form.Field}>
          <Grid.Column
            width={4}
            as='label'
            htmlFor={this.props.name}
            verticalAlign='middle'
          >
            {this.props.verboseName}
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input
              name={this.props.name}
              placeholder={this.props.verboseName}
              value={this.props.value}
              onChange={this.props.handleChange}
              type='password'
              id={this.props.name}
            />
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}
