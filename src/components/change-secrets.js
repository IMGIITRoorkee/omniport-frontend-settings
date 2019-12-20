import React from 'react'
import { connect } from 'react-redux'
import { Form, Grid, Segment, Button, Message, Header } from 'semantic-ui-react'
import { isBrowser } from 'react-device-detect'
import { capitalize, startCase } from 'lodash'

import CustomBreadcrumb from 'core/common/src/components/custom-breadcrumb'
import { getTheme } from 'formula_one'
import { setSecret, changeSecret } from '../actions'
import { appBaseURL } from '../urls'
import { errorExist } from '../utils'

class ChangeSecrets extends React.Component {
  state = {
    oldPassword: '',
    secretQuestion: '',
    secretAnswer: '',
    error: false,
    success: false,
    message: ''
  }
  componentDidMount () {
    this.props.SetSecret(this.successSetCallback, this.errorSetCallback)
  }
  successSetCallback = res => {
    const { data } = res
    this.setState({
      secretQuestion: data.secretQuestion
    })
  }
  handleInputChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    })
  }
  handleSubmit = () => {
    const { oldPassword, secretQuestion, secretAnswer } = this.state
    const data = {
      oldPassword,
      secretQuestion,
      secretAnswer
    }
    this.props.ChangeSecret(
      data,
      this.successChangeCallback,
      this.errChangeCallback
    )
  }
  successChangeCallback = res => {
    this.setState({
      success: true,
      error: false,
      message: ''
    })
  }
  errChangeCallback = err => {
    this.setState({
      success: false,
      error: true,
      message: err.response.data.errors
    })
  }
  render () {
    const {
      secretQuestion,
      oldPassword,
      secretAnswer,
      success,
      error,
      message
    } = this.state
    return (
      <div>
        <CustomBreadcrumb
          list={[
            { name: 'Settings', link: appBaseURL() },
            { name: 'Change secret Q&A' }
          ]}
        />
        <Segment color={getTheme()} attached='top'>
          <Header as='h4'>Change secret Q&A</Header>
        </Segment>
        <Segment attached='bottom'>
          <Form>
            {(error || success) && (
              <Grid>
                <Grid.Column width={isBrowser ? 10 : 16}>
                  {error && (
                    <Message
                      negative
                      icon='frown outline'
                      header='Error'
                      list={Object.keys(message)
                        .map(cat => {
                          return message[cat].map(x => {
                            return `${capitalize(startCase(cat))}: ${x}`
                          })
                        })
                        .map(x => {
                          return x[0]
                        })}
                    />
                  )}
                  {success && (
                    <Message
                      positive
                      header='Success'
                      content={`Successfully updated  security Q&A.`}
                      icon='check'
                    />
                  )}
                </Grid.Column>
              </Grid>
            )}
            <Grid stackable>
              <Grid.Row
                as={Form.Field}
                required
                error={error && errorExist(message, 'oldPassword')}
              >
                <Grid.Column
                  width={4}
                  as='label'
                  htmlFor='oldPassword'
                  verticalAlign='middle'
                >
                  Current password
                </Grid.Column>
                <Grid.Column width={6}>
                  <Form.Input
                    type='password'
                    name='oldPassword'
                    placeholder='Current password'
                    value={oldPassword}
                    onChange={this.handleInputChange}
                    id='oldPassword'
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row
                as={Form.Field}
                required
                error={error && errorExist(message, 'secretQuestion')}
              >
                <Grid.Column
                  width={4}
                  as='label'
                  htmlFor='secretQuestion'
                  verticalAlign='middle'
                >
                  Secret question
                </Grid.Column>
                <Grid.Column width={6}>
                  <Form.Input
                    name='secretQuestion'
                    placeholder='Secret question'
                    value={secretQuestion}
                    onChange={this.handleInputChange}
                    id='secretQuestion'
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row
                as={Form.Field}
                required
                error={error && errorExist(message, 'secretAnswer')}
              >
                <Grid.Column
                  width={4}
                  as='label'
                  htmlFor='secretAnswer'
                  verticalAlign='middle'
                >
                  Secret answer
                </Grid.Column>
                <Grid.Column width={6}>
                  <Form.Input
                    name='secretAnswer'
                    placeholder='(Unchanged)'
                    value={secretAnswer}
                    onChange={this.handleInputChange}
                    id='secretAnswer'
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row as={Form.Field}>
                <Grid.Column width={6} verticalAlign='middle'>
                  <Button
                    basic
                    icon='key'
                    color={getTheme()}
                    onClick={this.handleSubmit}
                    content='Change secret Q&A'
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
    changePassword: state.changePassword,
    changeSecret: state.changeSecret
  }
}
const mapDispatchToProps = dispatch => {
  return {
    SetSecret: (successCallback, errCallback) => {
      dispatch(setSecret(successCallback, errCallback))
    },
    ChangeSecret: (data, successCallback, errCallback) => {
      dispatch(changeSecret(data, successCallback, errCallback))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeSecrets)
