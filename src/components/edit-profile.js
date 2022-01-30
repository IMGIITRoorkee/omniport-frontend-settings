import React from 'react'
import { connect } from 'react-redux'

import CustomBreadcrumb from 'core/common/src/components/custom-breadcrumb'
import ProfileCard from './edit-profile/profile-card'
import SettingInfo from './edit-profile/setting-info'
import { setUser } from '../actions'
import { appBaseURL } from '../urls'
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
      <div>
        <CustomBreadcrumb
          list={[
            { name: 'Settings', link: appBaseURL() },
            { name: 'Edit profile' }
          ]}
        />
        <ProfileCard />
        {['biological', 'contact', 'financial', 'political', 'residential'].map(
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
