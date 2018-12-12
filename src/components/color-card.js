import React from 'react'
import { Card, Icon, Transition } from 'semantic-ui-react'

import { getTheme } from 'formula_one'

import '../css/theme.css'
export default class ColorCard extends React.PureComponent {
  setTheme = () => {
    localStorage.setItem('selectedColor', this.props.color.name)
    // window.location.reload()
  }
  render () {
    return (
      <Card href={`#${this.props.color.name}`} onClick={this.setTheme}>
        <div
          styleName='theme-card'
          style={{ background: this.props.color.hexCode }}
        >
          <Transition.Group animation='zoom' duration='400'>
            {this.props.activeColor === this.props.color.name && (
              <span>
                <Icon size='big' name='check' className='check' />
              </span>
            )}
          </Transition.Group>
        </div>
        <Card.Content>
          <Card.Header>{this.props.color.verboseName}</Card.Header>
          <Card.Meta>{this.props.color.description}</Card.Meta>
        </Card.Content>
      </Card>
    )
  }
}
