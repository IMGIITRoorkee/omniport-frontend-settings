import React from 'react'
import { connect } from 'react-redux'
import {
  Segment,
  Grid,
  Header,
  Form,
  Button,
  Loader,
  Message
} from 'semantic-ui-react'
import { capitalize, startCase } from 'lodash'

import { getTheme } from 'formula_one'
import { convertStateToData, errorExist } from '../../utils'
import { setOptions, setData, changeData } from '../../actions'
import InputField from '../input-field'

import '../../css/edit-profile.css'

class SettingInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: false,
      success: false,
      message: {}
    }
  }

  componentDidMount () {
    const { settingType } = this.props
    if (!this.props[`${settingType}Settings`].optionsLoaded) {
      this.props.SetOptions(
        settingType,
        this.successOptionsCallback,
        this.errOptionsCallback
      )
    }
  }

  successOptionsCallback = res => {
    const { settingType } = this.props
    this.props.SetData(
      settingType,
      this.successDataCallback,
      this.errDataCallback
    )
  }

  errOptionsCallback = err => {}

  successDataCallback = res => {
    this.setState({ ...res.data })
  }

  errDataCallback = err => {}

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {
    const { settingType } = this.props
    this.props.ChangeData(
      settingType,
      convertStateToData(
        this.props[`${settingType}Settings`].options,
        this.state
      ),
      this.successSubmitCallback,
      this.errSubmitCallback
    )
  }

  successSubmitCallback = res => {
    this.setState({
      success: true,
      error: false,
      message: res.data
    })
  }

  errSubmitCallback = err => {
    this.setState({
      success: false,
      error: true,
      message: err.response.data
    })
  }

  render () {
    const { settingType } = this.props
    const { error, message, success } = this.state
    return (
      <div styleName='profile-card-wrapper'>
        <Segment color={getTheme()} attached='top'>
          <Header as='h3'>{capitalize(settingType)} information</Header>
        </Segment>
        <Segment attached='bottom'>
          <Form>
            {error && (
              <Message
                negative
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
                content='Successfuly updated profile.'
              />
            )}
            <Grid stackable styleName='form-container'>
              {this.props[`${settingType}Settings`].optionsLoaded ? (
                Object.keys(this.props[`${settingType}Settings`].options).map(
                  (field, index) => {
                    return (
                      field !== 'id' && (
                        <InputField
                          key={field}
                          field={
                            this.props[`${settingType}Settings`].options[field]
                          }
                          name={field}
                          handleChange={this.handleChange}
                          value={this.state[field]}
                          /**
                           * ToDo: Send errors from here
                           * **/
                          error={errorExist(message, field)}
                        />
                      )
                    )
                  }
                )
              ) : (
                <Loader />
              )}
              <Grid.Row as={Form.Field}>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Button
                    color={getTheme()}
                    onClick={this.handleSubmit}
                    basic
                    icon='check'
                    content='Save'
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
    whoAmI: state.whoAmI,
    financialSettings: state.financialSettings,
    biologicalSettings: state.biologicalSettings,
    politicalSettings: state.politicalSettings
  }
}
const mapDispatchToProps = dispatch => {
  return {
    SetOptions: (settingType, successCallback, errCallback) => {
      dispatch(setOptions(settingType, successCallback, errCallback))
    },
    SetData: (settingType, successCallback, errCallback) => {
      dispatch(setData(settingType, successCallback, errCallback))
    },
    ChangeData: (settingType, data, successCallback, errCallback) => {
      dispatch(changeData(settingType, data, successCallback, errCallback))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingInfo)