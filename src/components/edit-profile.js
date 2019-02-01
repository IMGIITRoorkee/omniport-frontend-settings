import React from 'react'
import { connect } from 'react-redux'

import ProfileCard from './edit-profile/profile-card'
import SettingInfo from './edit-profile/setting-info'
import { setUser } from '../actions'
import '../css/edit-profile.css'

class EditProfile extends React.Component {
  state = {
    old_password: '',
    new_password: '',
    confirm_password: ''
  }
  componentDidMount () {
    this.props.SetUser()
  }
  render () {
    return (
      <div styleName='edit-profile-wrapper'>
        <ProfileCard />
        {['biological', 'financial', 'political', 'residential'].map(
          settingType => {
            return <SettingInfo settingType={settingType} key={settingType} />
          }
        )}
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
  return {
    SetUser: () => {
      dispatch(setUser())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile)
