import React from 'react'
import { Card } from 'semantic-ui-react'

import CustomBreadcrumb from 'core/common/src/components/custom-breadcrumb'
import { getTheme } from 'formula_one'
import colorData from 'formula_one/src/assets/colorData.json'
import ColorCard from './color-card'
import { appBaseURL } from '../urls'
import '../css/theme.css'

export default class ChangeTheme extends React.Component {
  componentDidMount () {}
  render () {
    return (
      <div styleName='theme-wrapper'>
        <CustomBreadcrumb
          list={[
            { name: 'Settings', link: appBaseURL() },
            { name: 'Change theme' }
          ]}
        />
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
