import React from 'react'
import { connect } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Form, Grid, Segment, Button, Message, Header } from 'semantic-ui-react'

import { getTheme } from 'formula_one'
import PasswordField from './change-password/password-field'
import { initialiseChangePassword, submitChangePassword } from '../actions'

import '../css/change-password.css'

class ChangePassword extends React.Component {
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

  handleInputChange = (e, { name, value }) => {
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
      this.setState({
        old_password: '',
        new_password: '',
        confirm_password: ''
      })
      this.props.SubmitChangePassword(data)
    } else {
      this.setState({
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
        <Segment color={getTheme()} attached='top'>
          <Header as='h3'>Change password</Header>
        </Segment>
        <Segment attached='bottom'>
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
                  icon={
                    this.state.message.type === 'success' ? 'check' : 'frown'
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
                  icon={changePassword.type === 'success' ? 'check' : 'frown'}
                  list={changePassword.data}
                />
              </Grid.Column>
            </Grid>
          )}
          <Form>
            <Grid stackable>
              <PasswordField
                name='old_password'
                verboseName='Current Password'
                handleChange={this.handleInputChange}
                value={this.state.old_password}
              />
              <PasswordField
                name='new_password'
                verboseName='New Password'
                handleChange={this.handleInputChange}
                value={this.state.new_password}
              />
              <PasswordField
                name='confirm_password'
                verboseName='Confirm Password'
                handleChange={this.handleInputChange}
                value={this.state.confirm_password}
              />
              <Grid.Row as={Form.Field}>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Button
                    basic
                    icon='key'
                    color={getTheme()}
                    onClick={this.handleSubmit}
                    content='Change password'
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => {
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
