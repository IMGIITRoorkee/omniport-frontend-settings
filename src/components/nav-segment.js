import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import '../css/nav-segment.css'

const url = window.location.href.replace(/\/$/, '')
const defaultActiveItem = url.substr(url.lastIndexOf('/') + 1)
export default class NavSegment extends Component {
  state = {
    activeItem:
      defaultActiveItem === 'settings' ? 'profile' : defaultActiveItem
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    const { activeItem } = this.state

    return (
      <div styleName='nav-container'>
        <Menu vertical styleName='nav-menu'>
          <Menu.Item
            name='profile'
            active={activeItem === 'profile'}
            onClick={this.handleItemClick}
            as={Link}
            to='/settings/'
          >
            Edit profile
          </Menu.Item>
          <Menu.Item
            name='change_password'
            active={activeItem === 'change_password'}
            onClick={this.handleItemClick}
            as={Link}
            to='/settings/change_password'
          >
            Change password
          </Menu.Item>
          <Menu.Item
            name='theme'
            active={activeItem === 'theme'}
            onClick={this.handleItemClick}
            as={Link}
            to='/settings/theme/'
          >
            Change theme
          </Menu.Item>
          <Menu.Item
            name='sessions'
            active={activeItem === 'sessions'}
            onClick={this.handleItemClick}
            as={Link}
            to='/settings/sessions'
          >
            Manage sessions
          </Menu.Item>
          <Menu.Item
            name='notifications'
            active={activeItem === 'notifications'}
            onClick={this.handleItemClick}
            as={Link}
            to='/settings/notifications'
          >
            Manage notifications
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
