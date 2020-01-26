import React from 'react'
import { Checkbox, List } from 'semantic-ui-react'

import '../../css/notifications.css'

export default class Sublist extends React.PureComponent {
  render () {
    const { categories } = this.props
    return (
      <List>
        {
          (categories).map(category => {
            return (
              <List.Item styleName={'list-item'}>
                <List.Icon name={'angle right'} style={{ opacity: 0 }}/> {/*Sorry*/}
                <List.Content>
                  <Checkbox label={category.name} id={category.slug}/>
                  {
                    (category.subcategories) &&
                    <Sublist categories={category.subcategories}/>
                  }
                </List.Content>
              </List.Item>
            )
          })
        }
      </List>
    )
  }
}
