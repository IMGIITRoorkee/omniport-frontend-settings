import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

import { urlAppNavigation } from '../urls'
import '../css/nav-segment.css'

export default class NavSegment extends Component {
  navSegmentItems = () => {
    return [
      {
        name: 'profile',
        heading: 'Edit profile',
        link: 'edit_profile'
      },
      {
        name: 'change_password',
        heading: 'Change password',
        link: 'change_password'
      },
      {
        name: 'change_secret_question_answer',
        heading: 'Change secret Q&A',
        link: 'change_secret_question_answer'
      },
      {
        name: 'theme',
        heading: 'Change theme',
        link: 'change_theme'
      },
      {
        name: 'sessions',
        heading: 'Manage sessions',
        link: 'manage_sessions'
      },
      {
        name: 'notifications',
        heading: 'Manage notifications',
        link: 'manage_notifications'
      },
      {
        name: 'emails',
        heading: 'Manage email notifications',
        link: 'manage_emails'
      }
    ]
  }

  render() {
    return (
      <div styleName='nav-container'>
        <Menu vertical styleName='nav-menu'>
          {this.navSegmentItems().map(item => {
            return (
              <Menu.Item
                name={item.name}
                onClick={this.handleItemClick}
                as={NavLink}
                to={urlAppNavigation(item.link)}
              >
                {item.heading}
              </Menu.Item>
            )
          })}
        </Menu>
      </div>
    )
  }
}
