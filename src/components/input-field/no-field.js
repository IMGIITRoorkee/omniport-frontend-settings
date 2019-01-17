import React from 'react'
import { Grid, Form, Segment } from 'semantic-ui-react'

export default class InputField extends React.PureComponent {
  render () {
    const { field } = this.props
    const { type } = field
    return (
      <React.Fragment>
        <Grid.Row as={Form.Field}>
          <Grid.Column width={10}>
            <Segment>
              The field type{' '}
              <strong>
                <code>{type}</code>
              </strong>{' '}
              is not supported at this stage of development.
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}
