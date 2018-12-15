import React from 'react'
import { Card } from 'semantic-ui-react'

import colorData from 'formula_one/src/assets/colorData.json'
import ColorCard from './color-card'
import '../css/theme.css'

import { getTheme } from 'formula_one'

export default class ChangeTheme extends React.Component {
  componentDidMount () {}
  render () {
    return (
      <div styleName='theme-wrapper'>
        <Card.Group itemsPerRow={3} stackable doubling>
          {colorData.list.map((color, index) => {
            return (
              <ColorCard key={index} color={color} activeColor={getTheme()} />
            )
          })}
        </Card.Group>
      </div>
    )
  }
}
