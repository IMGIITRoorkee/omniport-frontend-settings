import React from 'react'
import { connect } from 'react-redux'
import {
  List,
  Checkbox,
  Segment,
  Accordion, Icon
} from 'semantic-ui-react'

import CustomBreadcrumb from 'core/common/src/components/custom-breadcrumb'
import { appDetails, Loading } from 'formula_one'
import { getNotificationCategoryList } from '../actions'
import Sublist from './manage-notifications/sublist'

import '../css/notifications.css'
import { appBaseURL } from '../urls'
import { getTheme } from '../../../../formula_one/src/utils'

class ManageNotifications extends React.PureComponent {
  state = { activeIndex: -1 }

  componentDidMount () {
    const { notificationCategoryList, GetNotificationCategoryList } = this.props
    if (!notificationCategoryList.loaded) {
      GetNotificationCategoryList()
    }
  }

  handleClick = (e, titleProps) => {
    console.info('Clicked', titleProps.index)
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render () {
    const { notificationCategoryList } = this.props
    const { activeIndex } = this.state
    return (
      <div>
        <CustomBreadcrumb
          list={[
            { name: 'Settings', link: appBaseURL() },
            { name: 'Manage Notifications' }
          ]}
        />

        <Accordion>
          {
            notificationCategoryList.loaded
              ? (notificationCategoryList.data) &&
              notificationCategoryList.data
                .filter(app => {
                  return appDetails(app.slug).present || true
                })
                .map((app, index) => {
                  return (
                    <>
                      <Accordion.Title
                        as={Segment}
                        color={getTheme()}
                        attached='top'
                        index={index}
                        onClick={this.handleClick}
                      >
                        <Checkbox
                          label={app.name}
                          id={app.slug}
                          defaultChecked={app.subscribed}
                        />
                        <Icon
                          name={
                            activeIndex===index
                              ? 'angle down'
                              : 'angle right'
                          }
                        />
                      </Accordion.Title>

                      <Accordion.Content
                        as={Segment}
                        active={activeIndex === index}
                        attached='bottom'
                      >
                        {console.info('activeIndex', activeIndex)}
                        {(app.subcategories) &&
                        (
                          <Sublist categories={app.subcategories}/>
                        )
                        }
                      </Accordion.Content>
                    </>
                  )
                })
              : <Loading/>
          }
        </Accordion>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notificationCategoryList: state.notificationCategoryList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    GetNotificationCategoryList: () => {
      dispatch(getNotificationCategoryList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageNotifications)
