import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { Segment, Grid, Header, Image, Button } from 'semantic-ui-react'
import { isMobile } from 'react-device-detect'

import { getTheme, getThemeObject, DefaultDP } from 'formula_one'
import '../../css/edit-profile.css'

class ProfileCard extends React.Component {
  componentDidMount () {}
  render () {
    const { whoAmI } = this.props
    return (
      <div styleName='profile-card-wrapper'>
        <Segment color={getTheme()}>
          <div
            styleName={`${
              isMobile ? 'profile-card-mobile' : 'profile-card-desktop'
            }`}
          >
            {whoAmI.loaded && whoAmI.data.displayPicture ? (
              <Image
                src={whoAmI.data.displayPicture}
                circular
                styleName='display-avatar'
              />
            ) : (
              <DefaultDP
                name={
                  whoAmI.loaded && whoAmI.data.fullName
                    ? whoAmI.data.fullName.toUpperCase()
                    : ''
                }
                size='4em'
              />
            )}
            <div
              styleName={`display-desc ${isMobile ? 'text-align-center' : ''}`}
            >
              <Header as='h4' styleName='display-desc-header'>
                {whoAmI.loaded && whoAmI.data.fullName}
                <Header.Subheader>
                  {whoAmI.loaded && map(whoAmI.data.roles, 'role').join(', ')}
                </Header.Subheader>
              </Header>
              <div
                styleName={`display-desc-button ${
                  isMobile ? 'text-align-center' : ''
                }`}
              >
                <Button color={getTheme()}>Edit Profile Picture</Button>
              </div>
            </div>
          </div>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    whoAmI: state.whoAmI
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileCard)
