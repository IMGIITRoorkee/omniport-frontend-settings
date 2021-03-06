import React from 'react'
import { connect } from 'react-redux'
import { Header, Segment, Placeholder } from 'semantic-ui-react'
import { isBrowser } from 'react-device-detect'

import CustomBreadcrumb from 'core/common/src/components/custom-breadcrumb'
import { getTheme } from 'formula_one'
import { setSessionList } from '../actions/'
import { appBaseURL } from '../urls'
import SessionElement from './manage-sessions/session-element'

class ManageSessions extends React.Component {
  componentDidMount () {
    this.props.SetSessionList()
  }
  render () {
    const { manageSessions } = this.props
    return (
      <div>
        <CustomBreadcrumb
          list={[
            { name: 'Settings', link: appBaseURL() },
            { name: 'Manage sessions' }
          ]}
        />
        <Segment color={getTheme()} attached='top'>
          <Header as='h4'>Manage sessions</Header>
        </Segment>
        <Segment attached='bottom'>
          {manageSessions.loaded ? (
            <React.Fragment>
              <Segment>Total sessions: {manageSessions.data.length}</Segment>
              {manageSessions.data.map(data => {
                return <SessionElement key={data.id} data={data} />
              })}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Segment>
                <Placeholder>
                  <Placeholder.Header>
                    <Placeholder.Line length='short' />
                  </Placeholder.Header>
                </Placeholder>
              </Segment>
              {[...Array(6)].map((item, index) => {
                return (
                  <Segment>
                    <Placeholder>
                      <Placeholder.Header image={isBrowser}>
                        <Placeholder.Line length='short' />
                        <Placeholder.Line length='short' />
                        <Placeholder.Line length='short' />
                        <Placeholder.Line length='short' />
                      </Placeholder.Header>
                    </Placeholder>
                  </Segment>
                )
              })}
            </React.Fragment>
          )}
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    manageSessions: state.manageSessions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    SetSessionList: () => {
      dispatch(setSessionList())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageSessions)
