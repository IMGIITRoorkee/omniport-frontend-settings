import React from 'react'
import { connect } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Form, Grid, Segment, Button, Message } from 'semantic-ui-react'

import { initialiseChangePassword, submitChangePassword } from '../actions'

import '../css/change-password.css'
import { getTheme } from 'formula_one'

class ChangePassword extends React.PureComponent {
  state = {
    old_password: '',
    new_password: '',
    confirm_password: '',
    message: {
      active: false,
      type: '',
      data: []
    }
  }
  componentDidMount () {
    this.props.InitialiseChangePassword()
  }

  handleInputChange = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }
  handleSubmit = () => {
    if (this.state.new_password === this.state.confirm_password) {
      const data = {
        old_password: this.state.old_password,
        new_password: this.state.new_password
      }
      this.props.SubmitChangePassword(data)
    } else {
      this.setState({
        old_password: '',
        new_password: '',
        confirm_password: '',
        message: {
          active: true,
          type: 'error',
          data: ['Password do not match.']
        }
      })
    }
  }
  render () {
    const { changePassword } = this.props
    return (
      <div styleName='change-password-wrapper'>
        <Segment compact color={getTheme()}>
          {this.state.message.active && (
            <Grid>
              <Grid.Column width={isBrowser ? 10 : 16}>
                <Message
                  error={this.state.message.type === 'error'}
                  success={this.state.message.type === 'success'}
                  header={
                    this.state.message.type.charAt(0).toUpperCase() +
                    this.state.message.type.slice(1)
                  }
                  list={this.state.message.data}
                />
              </Grid.Column>
            </Grid>
          )}

          {changePassword.active && (
            <Grid>
              <Grid.Column width={isBrowser ? 10 : 16}>
                <Message
                  error={changePassword.type === 'error'}
                  success={changePassword.type === 'success'}
                  header={
                    changePassword.type.charAt(0).toUpperCase() +
                    changePassword.type.slice(1)
                  }
                  list={changePassword.data}
                />
              </Grid.Column>
            </Grid>
          )}
          <Form>
            <Grid stackable>
              <Grid.Row as={Form.Field}>
                <Grid.Column
                  width={4}
                  as='label'
                  htmlFor='old_password'
                  verticalAlign='middle'
                >
                  Current password
                </Grid.Column>
                <Grid.Column width={6}>
                  <Form.Input
                    value={this.state.old_password}
                    onChange={this.handleInputChange}
                    type='password'
                    name='old_password'
                    id='old_password'
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row as={Form.Field}>
                <Grid.Column
                  width={4}
                  as='label'
                  htmlFor='new_password'
                  verticalAlign='middle'
                >
                  New password
                </Grid.Column>
                <Grid.Column width={6}>
                  <Form.Input
                    value={this.state.new_password}
                    onChange={this.handleInputChange}
                    type='password'
                    name='new_password'
                    id='new_password'
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row as={Form.Field}>
                <Grid.Column
                  width={4}
                  as='label'
                  htmlFor='confirm_password'
                  verticalAlign='middle'
                >
                  Confirm password
                </Grid.Column>
                <Grid.Column width={6}>
                  <Form.Input
                    value={this.state.confirm_password}
                    onChange={this.handleInputChange}
                    type='password'
                    name='confirm_password'
                    id='confirm_password'
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row as={Form.Field}>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Button color={getTheme()} onClick={this.handleSubmit}>
                    Chage password
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    changePassword: state.changePassword
  }
}
const mapDispatchToProps = dispatch => {
  return {
    InitialiseChangePassword: () => {
      dispatch(initialiseChangePassword())
    },
    SubmitChangePassword: data => {
      dispatch(submitChangePassword(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword)
