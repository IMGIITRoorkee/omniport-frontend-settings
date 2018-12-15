import React from 'react'
import { connect } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'

import { getTheme } from 'formula_one'
import { setSessionList } from '../actions/'
import SessionElement from './manage-sessions/session-element'

class ManageSessions extends React.Component {
  componentDidMount () {
    this.props.SetSessionList()
  }
  render () {
    const { manageSessions } = this.props
    return (
      <div>
        <Segment color={getTheme()} attached='top'>
          <Header as='h3'>Manage sessions</Header>
        </Segment>
        <Segment attached='bottom'>
          {manageSessions.loaded && (
            <React.Fragment>
              <Segment>Total sessions: {manageSessions.data.length}</Segment>
              {manageSessions.data.map(data => {
                return <SessionElement key={data.id} data={data} />
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
