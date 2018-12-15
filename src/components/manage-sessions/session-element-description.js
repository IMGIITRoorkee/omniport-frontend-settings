import React from 'react'
import { Icon } from 'semantic-ui-react'

import '../../css/manage-sessions.css'

export default class OneLineDescription extends React.Component {
  componentDidMount () {}
  render () {
    return (
      <div styleName='session-wrapper'>
        <div>
          <Icon name={this.props.icon} />
        </div>
        <span>{this.props.desc}</span>
      </div>
    )
  }
}
