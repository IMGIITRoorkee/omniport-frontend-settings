import React from 'react'
import { connect } from 'react-redux'
import { Button, Segment, Icon, Popup } from 'semantic-ui-react'
import { isBrowser } from 'react-device-detect'
import moment from 'moment'

import { getTheme, getThemeObject } from 'formula_one'
import OneLineDescription from './session-element-description'
import { deleteSession } from '../../actions'
import '../../css/manage-sessions.css'

class SessionElement extends React.PureComponent {
  renderDevice = () => {
    switch (this.props.data.deviceType) {
      case 'com':
        return { icon: 'computer', desc: 'Computer' }
      case 'mob':
        return { icon: 'mobile alternate', desc: 'Mobile' }
      case 'tab':
        return { icon: 'tablet alternate', desc: 'Tablet' }
      default:
        return { icon: 'question', desc: 'Unknown' }
    }
  }

  renderBrowser = () => {
    const browserFamily = this.props.data.browserFamily
    switch (true) {
      case /IE/.test(browserFamily):
        return { icon: 'internet explorer', desc: 'Internet Explorer' }
      case /Firefox/.test(browserFamily):
        return { icon: 'firefox', desc: browserFamily }
      case /Chrome/.test(browserFamily):
        return { icon: 'chrome', desc: browserFamily }
      case /Safari/.test(browserFamily):
        return { icon: 'safari', desc: browserFamily }
      case /Opera/.test(browserFamily):
        return { icon: 'opera', desc: browserFamily }
      case /Edge/.test(browserFamily):
        return { icon: 'edge', desc: browserFamily }
      default:
        return { icon: 'globe', desc: browserFamily }
    }
  }

  renderOS = () => {
    const os = this.props.data.operatingSystemFamily
    switch (true) {
      case /Windows/.test(os):
        return { icon: 'windows', desc: os }
      case /Linux|Ubuntu|Fedora/.test(os):
        return { icon: 'linux', desc: os }
      case /iOS|Mac/.test(os):
        return { icon: 'apple', desc: os }
      case /Android/.test(os):
        return { icon: 'android', desc: os }
      default:
        return { icon: 'microchip', desc: os }
    }
  }

  handleClick = () => {
    this.props.DeleteSession(this.props.data.id)
  }
  render () {
    const { data } = this.props
    return (
      <Segment
        as='div'
        styleName='session-wrapper'
        style={{ borderLeft: `2px solid ${getThemeObject().hexCode}` }}
      >
        {isBrowser && (
          <div styleName='session-item-container'>
            <Popup
              trigger={<Icon name={this.renderDevice().icon} size='big' />}
              content={`Device type: ${this.renderDevice().desc}`}
              position='left center'
              inverted
            />
          </div>
        )}
        <div styleName='session-description-container'>
          <OneLineDescription
            desc={`${moment(data.datetimeCreated).format(
              'h:mm a, MMMM Do, YYYY'
            )}`}
            icon='time'
          />
          <OneLineDescription
            desc={
              data.browserFamily === 'IE'
                ? 'Internet Explorer'
                : data.browserFamily
            }
            icon={this.renderBrowser().icon}
          />
          <OneLineDescription
            desc={`${data.operatingSystemFamily} ${
              data.operatingSystemVersion
            }`}
            icon={this.renderOS().icon}
          />
          <OneLineDescription
            desc={data.location}
            icon='map marker alternate'
          />
        </div>
        <div styleName='session-button-container'>
          {isBrowser ? (
            <Button
              basic
              color={getTheme()}
              icon={data.current ? 'hand point left outline' : 'sign out'}
              content={data.current ? 'Current' : 'Sign out'}
              onClick={this.handleClick}
              disabled={data.current}
            />
          ) : (
            <Button
              basic
              disabled={data.current}
              color={getTheme()}
              onClick={this.handleClick}
              icon={data.current ? 'hand point left outline' : 'sign out'}
            />
          )}
        </div>
      </Segment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    DeleteSession: id => {
      dispatch(deleteSession(id))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SessionElement)
