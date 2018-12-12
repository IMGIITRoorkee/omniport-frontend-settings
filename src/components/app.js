import React from 'react'
import { connect } from 'react-redux'
import { isBrowser, isMobile } from 'react-device-detect'
import { Scrollbars } from 'react-custom-scrollbars'
import { Route } from 'react-router-dom'

import { Container, Rail, Segment, Grid } from 'semantic-ui-react'
import Sidebar from 'core/common/src/components/primary-sidebar'
import { AppHeader, AppFooter, AppMain } from 'formula_one'
import NavSegment from './nav-segment'
import EditProfile from './edit-profile'
import ChangePassword from './change-password'
import ManageSessions from './manage-sessions'
import ManageNotifications from './manage-notifications'
import ChangeTheme from './change-theme'

import main from 'formula_one/src/css/app.css'
import block from '../css/app.css'

class App extends React.PureComponent {
  componentDidMount () {}
  render () {
    const creators = [
      {
        name: 'Dhruv Bhanushali',
        role: 'Backend developer'
      },
      {
        name: 'Praduman Goyal',
        role: 'Frontend developer'
      }
    ]
    return (
      <React.Fragment>
        <div styleName='main.app'>
          <AppHeader mode='site' appName='settings' userDropdown />
          {isMobile && <Sidebar />}
          <AppMain>
            <div styleName='main.app-main'>
              {isBrowser && <Sidebar />}

              <Scrollbars autoHide>
                <Container styleName='block.app-container'>
                  <Grid stackable reversed styleName='block.app-grid'>
                    {isMobile && (
                      <Grid.Row centered>
                        <Grid.Column>
                          <NavSegment />
                        </Grid.Column>
                      </Grid.Row>
                    )}
                    <Grid.Row>
                      <Grid.Column width={isBrowser ? 12 : 16}>
                        <div styleName='block.app-wrapper'>
                          <Route
                            exact
                            path='/settings/'
                            component={EditProfile}
                          />
                          <Route
                            path='/settings/change_password'
                            component={ChangePassword}
                          />
                          <Route
                            path='/settings/sessions'
                            component={ManageSessions}
                          />
                          <Route
                            path='/settings/theme/'
                            component={ChangeTheme}
                          />
                          <Route
                            path='/settings/notifications'
                            component={ManageNotifications}
                          />
                        </div>
                      </Grid.Column>
                      {isBrowser && (
                        <Grid.Column width={4}>
                          <NavSegment />
                        </Grid.Column>
                      )}
                    </Grid.Row>
                  </Grid>
                </Container>
              </Scrollbars>
            </div>
          </AppMain>
          <AppFooter creators={creators} />
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps (state) {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
