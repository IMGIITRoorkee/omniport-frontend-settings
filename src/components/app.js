import React from 'react'
import { isBrowser, isMobile } from 'react-device-detect'
import { Scrollbars } from 'react-custom-scrollbars'
import { Route, Switch } from 'react-router-dom'

import { Container, Grid } from 'semantic-ui-react'
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

class App extends React.Component {
  componentDidMount () {}
  render () {
    const creators = [
      {
        name: 'Dhruv Bhanushali',
        role: 'Backend developer',
        link: 'https://dhruvkb.github.io/'
      },
      {
        name: 'Praduman Goyal',
        role: 'Frontend developer',
        link: 'https://pradumangoyal.github.io'
      }
    ]
    return (
      <React.Fragment>
        <div styleName='main.app'>
          <AppHeader mode='site' appName='settings' userDropdown dummy={{}} />
          {isMobile && <Sidebar />}
          <AppMain>
            <div styleName='main.app-main'>
              {isBrowser && <Sidebar />}

              <Scrollbars autoHide>
                <Container styleName='block.app-container'>
                  <Grid stackable styleName='block.app-grid'>
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
                          <Switch>
                            <Route
                              exact
                              path='/settings/'
                              component={EditProfile}
                            />
                            <Route
                              exact
                              path='/settings/change_password'
                              component={ChangePassword}
                            />
                            <Route
                              exact
                              path='/settings/sessions'
                              component={ManageSessions}
                            />
                            <Route
                              exact
                              path='/settings/theme/'
                              component={ChangeTheme}
                            />
                            <Route
                              exact
                              path='/settings/notifications'
                              component={ManageNotifications}
                            />
                          </Switch>
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
          <AppFooter userDropdown creators={creators} />
        </div>
      </React.Fragment>
    )
  }
}

export default App
