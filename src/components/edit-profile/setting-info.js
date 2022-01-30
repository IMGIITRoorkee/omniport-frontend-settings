import React from 'react'
import { connect } from 'react-redux'
import {
  Segment,
  Grid,
  Header,
  Form,
  Button,
  Placeholder,
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

  errOptionsCallback = err => {
    this.setState({
      error: true,
      success: false
    })
  }

  successDataCallback = res => {
    this.setState({ ...res.data })
  }

  errDataCallback = err => {}

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  nullResponseMessage = () => {
    this.setState({
      success: false,
      message: {},
      error: false
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
    const { data } = res
    this.setState({
      success: true,
      error: false,
      ...data
    })
    setTimeout(this.nullResponseMessage, 3000)
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
      <React.Fragment>
        <Segment attached='top'>
          <Header as='h4'>{capitalize(settingType)} information</Header>
        </Segment>
        <Segment attached='bottom'>
          <Form>
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
                content={`Successfully updated ${settingType} information.`}
                icon='check'
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
                          error={error && errorExist(message, field)}
                        />
                      )
                    )
                  }
                )
              ) : (
                <React.Fragment>
                  {[...Array(4)].map((item, index) => {
                    return (
                      <Grid.Row key={index}>
                        <Placeholder
                          style={{ width: '100%', marginLeft: '1em' }}
                        >
                          <Placeholder.Image
                            style={{ width: '100%', height: '3em' }}
                          />
                        </Placeholder>
                      </Grid.Row>
                    )
                  })}
                </React.Fragment>
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
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    whoAmI: state.whoAmI,
    financialSettings: state.financialSettings,
    biologicalSettings: state.biologicalSettings,
    contactSettings: state.contactSettings,
    politicalSettings: state.politicalSettings,
    residentialSettings: state.residentialSettings
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
